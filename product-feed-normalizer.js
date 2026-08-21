/* Prestige Product Feed Normalizer
 * Normalizes Shopify, Shopify Collective, Prestige digital products, eBay EPN
 * searches/listings, and future affiliate feeds into one stable contract.
 * Works in modern browsers and Node-compatible runtimes without dependencies.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.PrestigeProductNormalizer = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const SCHEMA_VERSION = '1.0.0';
  const ALLOWED_STATUS = new Set(['ACTIVE', 'DRAFT', 'ARCHIVED', 'UNKNOWN']);
  const SOURCE_TYPES = new Set([
    'shopify_product',
    'shopify_collective',
    'prestige_digital',
    'ebay_epn_search',
    'ebay_listing',
    'amazon_affiliate',
    'home_depot_affiliate',
    'external_affiliate'
  ]);

  function cleanString(value) {
    if (value === null || value === undefined) return null;
    const out = String(value).trim();
    return out || null;
  }

  function asNumber(value) {
    if (value === null || value === undefined || value === '') return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  function asBool(value) {
    return value === true;
  }

  function uniqueStrings(values) {
    return [...new Set((values || []).map(cleanString).filter(Boolean))];
  }

  function inferAvailability(status, sourceType) {
    if (sourceType === 'ebay_epn_search') return 'DYNAMIC_SEARCH';
    if (status === 'ACTIVE') return 'LIVE';
    if (status === 'DRAFT') return 'NOT_FOR_SALE';
    if (status === 'ARCHIVED') return 'ARCHIVED';
    return 'UNKNOWN';
  }

  function normalizeStatus(value) {
    const status = (cleanString(value) || 'UNKNOWN').toUpperCase();
    return ALLOWED_STATUS.has(status) ? status : 'UNKNOWN';
  }

  function normalizeBase(input) {
    if (!input || typeof input !== 'object') throw new TypeError('Product input must be an object.');

    const sourceType = cleanString(input.source_type) || 'external_affiliate';
    if (!SOURCE_TYPES.has(sourceType)) {
      throw new Error(`Unsupported source_type: ${sourceType}`);
    }

    const status = normalizeStatus(input.status);
    return {
      product_id: cleanString(input.product_id),
      source_type: sourceType,
      source_id: cleanString(input.source_id),
      product_name: cleanString(input.product_name),
      category: cleanString(input.category) || 'uncategorized',
      image: cleanString(input.image),
      current_price: asNumber(input.current_price),
      currency: cleanString(input.currency) || 'USD',
      retailer: cleanString(input.retailer),
      destination: cleanString(input.destination),
      affiliate_url: cleanString(input.affiliate_url),
      campaign_id: cleanString(input.campaign_id),
      custom_id: cleanString(input.custom_id),
      description: cleanString(input.description),
      jason_tested: asBool(input.jason_tested),
      featured: asBool(input.featured),
      status,
      availability: cleanString(input.availability) || inferAvailability(status, sourceType),
      last_verified_date: cleanString(input.last_verified_date),
      content_hooks: uniqueStrings(input.content_hooks),
      disclosure_requirement: cleanString(input.disclosure_requirement),
      tags: uniqueStrings(input.tags)
    };
  }

  function normalizeShopifyProduct(product, options = {}) {
    if (!product || typeof product !== 'object') throw new TypeError('Shopify product is required.');

    const id = cleanString(product.id);
    const numericId = id ? id.split('/').pop() : cleanString(product.numericId);
    const handle = cleanString(product.handle);
    const tags = uniqueStrings(product.tags);
    const vendor = cleanString(product.vendor);
    const collective = tags.some(tag => tag.toLowerCase() === 'shopify collective');
    const digital = vendor === 'Prestige DigiTools' || cleanString(product.productType) === 'Digital Contractor Tool';
    const sourceType = digital ? 'prestige_digital' : (collective ? 'shopify_collective' : 'shopify_product');
    const baseUrl = cleanString(options.shopBaseUrl) || 'https://prestige-digitool.myshopify.com';
    const image = product.featuredMedia?.preview?.image?.url || product.image || null;
    const price = product.priceRangeV2?.minVariantPrice?.amount ?? product.price ?? null;
    const status = normalizeStatus(product.status);

    return normalizeBase({
      product_id: numericId ? `shopify:${numericId}` : null,
      source_type: sourceType,
      source_id: id || numericId,
      product_name: product.title,
      category: options.category || product.productType || (digital ? 'digital-tools' : 'shopify'),
      image,
      current_price: price,
      currency: product.priceRangeV2?.minVariantPrice?.currencyCode || product.currency || 'USD',
      retailer: digital ? 'Prestige DigiTools' : 'Prestige Contractor Best Picks',
      destination: 'Shopify',
      affiliate_url: handle ? `${baseUrl.replace(/\/$/, '')}/products/${handle}` : null,
      campaign_id: null,
      custom_id: null,
      description: product.description,
      jason_tested: options.jasonTested === true,
      featured: options.featured === true,
      status,
      availability: inferAvailability(status, sourceType),
      last_verified_date: options.lastVerifiedDate,
      content_hooks: options.contentHooks || [],
      disclosure_requirement: digital
        ? 'No affiliate disclosure; Prestige-owned digital product'
        : (collective ? 'Shopify Collective supplier relationship should be disclosed when materially relevant' : null),
      tags: [...tags, sourceType]
    });
  }

  function buildEbaySearchUrl(query, campaignId, customId, options = {}) {
    if (!cleanString(query)) throw new Error('eBay search query is required.');
    if (!cleanString(campaignId)) throw new Error('eBay EPN campaignId is required.');
    if (!cleanString(customId)) throw new Error('eBay EPN customId is required.');

    const params = new URLSearchParams({
      _nkw: query,
      mkcid: options.mkcid || '1',
      mkrid: options.mkrid || '711-53200-19255-0',
      siteid: options.siteid || '0',
      campid: campaignId,
      customid: customId,
      toolid: options.toolid || '10001',
      mkevt: options.mkevt || '1'
    });
    return `https://www.ebay.com/sch/i.html?${params.toString()}`;
  }

  function normalizeEbaySearch(item, options = {}) {
    const campaignId = cleanString(item.campaign_id || options.campaignId);
    const customId = cleanString(item.custom_id);
    const url = cleanString(item.affiliate_url) ||
      buildEbaySearchUrl(item.search_query || item.product_name, campaignId, customId);

    return normalizeBase({
      ...item,
      product_id: cleanString(item.product_id) || (cleanString(item.source_id) ? `ebay:${item.source_id}` : null),
      source_type: 'ebay_epn_search',
      retailer: 'eBay',
      destination: 'eBay',
      affiliate_url: url,
      campaign_id: campaignId,
      custom_id: customId,
      current_price: null,
      currency: item.currency || 'USD',
      status: item.status || 'ACTIVE',
      availability: 'DYNAMIC_SEARCH',
      disclosure_requirement: item.disclosure_requirement || 'eBay Partner Network affiliate disclosure required',
      tags: [...(item.tags || []), 'affiliate', 'ebay']
    });
  }

  function normalizeEbayListing(item, options = {}) {
    return normalizeBase({
      ...item,
      product_id: cleanString(item.product_id) || (cleanString(item.source_id) ? `ebay-listing:${item.source_id}` : null),
      source_type: 'ebay_listing',
      retailer: 'eBay',
      destination: 'eBay',
      campaign_id: cleanString(item.campaign_id || options.campaignId),
      status: item.status || 'ACTIVE',
      disclosure_requirement: item.disclosure_requirement || 'eBay Partner Network affiliate disclosure required',
      tags: [...(item.tags || []), 'affiliate', 'ebay', 'listing']
    });
  }

  function normalizeFutureAffiliate(item, sourceType) {
    if (!['amazon_affiliate', 'home_depot_affiliate', 'external_affiliate'].includes(sourceType)) {
      throw new Error('Future affiliate sourceType must be amazon_affiliate, home_depot_affiliate, or external_affiliate.');
    }
    return normalizeBase({
      ...item,
      source_type: sourceType,
      status: item.status || 'UNKNOWN',
      disclosure_requirement: item.disclosure_requirement || 'Affiliate disclosure required'
    });
  }

  function validateProduct(product) {
    const errors = [];
    if (!product || typeof product !== 'object') return ['Product is not an object'];
    if (!cleanString(product.product_id)) errors.push('product_id is required');
    if (!cleanString(product.product_name)) errors.push('product_name is required');
    if (!cleanString(product.source_type)) errors.push('source_type is required');
    if (!cleanString(product.destination)) errors.push('destination is required');
    if (!cleanString(product.affiliate_url)) errors.push('affiliate_url/destination URL is required');
    if (product.current_price !== null && !Number.isFinite(Number(product.current_price))) {
      errors.push('current_price must be numeric or null');
    }
    if (product.status === 'DRAFT' && product.availability === 'LIVE') {
      errors.push('DRAFT product cannot have LIVE availability');
    }
    if (product.source_type === 'ebay_epn_search') {
      if (!cleanString(product.campaign_id)) errors.push('eBay EPN campaign_id is required');
      if (!cleanString(product.custom_id)) errors.push('eBay EPN custom_id is required');
    }
    return errors;
  }

  function normalizeMany(items, adapter, options = {}) {
    if (!Array.isArray(items)) throw new TypeError('items must be an array');
    return items.map(item => adapter(item, options));
  }

  function buildFeed(products, metadata = {}) {
    const normalized = (products || []).map(normalizeBase);
    const validation = normalized.map(product => ({
      product_id: product.product_id,
      errors: validateProduct(product)
    })).filter(row => row.errors.length);

    if (validation.length) {
      const message = validation.map(v => `${v.product_id || 'unknown'}: ${v.errors.join(', ')}`).join('; ');
      throw new Error(`Product feed validation failed: ${message}`);
    }

    return {
      schema_version: SCHEMA_VERSION,
      generated_at: metadata.generated_at || new Date().toISOString(),
      source_of_truth: metadata.source_of_truth || 'Prestige product network',
      notes: uniqueStrings(metadata.notes),
      products: normalized
    };
  }

  function publishable(products) {
    return (products || []).filter(product =>
      product.status === 'ACTIVE' &&
      product.availability !== 'NOT_FOR_SALE' &&
      Boolean(product.affiliate_url)
    );
  }

  return {
    SCHEMA_VERSION,
    normalizeBase,
    normalizeShopifyProduct,
    normalizeEbaySearch,
    normalizeEbayListing,
    normalizeFutureAffiliate,
    buildEbaySearchUrl,
    validateProduct,
    normalizeMany,
    buildFeed,
    publishable
  };
});