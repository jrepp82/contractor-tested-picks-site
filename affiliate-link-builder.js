/* Prestige Affiliate Link Builder
 * Deterministic tracking links for content -> store -> revenue attribution.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.PrestigeAffiliateLinks = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const DEFAULT_EBAY = Object.freeze({
    campaignId: '5339172120',
    mkcid: '1',
    mkrid: '711-53200-19255-0',
    siteid: '0',
    toolid: '10001',
    mkevt: '1'
  });

  const PLATFORM_CODES = Object.freeze({
    facebook: 'fb', fb: 'fb', instagram: 'ig', ig: 'ig', youtube: 'yt',
    'youtube-shorts': 'yt', yt: 'yt', tiktok: 'tt', tt: 'tt', pinterest: 'pin',
    pin: 'pin', website: 'web', web: 'web', email: 'em', mailchimp: 'em',
    ebay: 'eb', shopify: 'sh', unknown: 'unk'
  });

  function slug(value, max = 28) {
    const s = String(value || '')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-');
    return (s || 'na').slice(0, max).replace(/-+$/g, '') || 'na';
  }

  function compactDate(input) {
    const d = input ? new Date(input) : new Date();
    if (Number.isNaN(d.getTime())) throw new Error('Invalid date');
    return `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
  }

  function platformCode(platform) {
    const key = String(platform || 'unknown').toLowerCase().trim();
    return PLATFORM_CODES[key] || slug(key, 6);
  }

  function buildCustomId({ platform, contentType = 'post', product, campaign = 'organic', date, variant }) {
    const parts = [
      platformCode(platform),
      slug(contentType, 10),
      slug(product, 24),
      slug(campaign, 16),
      compactDate(date)
    ];
    if (variant) parts.push(slug(variant, 10));
    return parts.join('-').slice(0, 96).replace(/-+$/g, '');
  }

  function ensureUrl(value) {
    try { return new URL(value); }
    catch { throw new Error(`Invalid URL: ${value}`); }
  }

  function applyEbayTracking(url, {
    campaignId = DEFAULT_EBAY.campaignId,
    customId,
    mkcid = DEFAULT_EBAY.mkcid,
    mkrid = DEFAULT_EBAY.mkrid,
    siteid = DEFAULT_EBAY.siteid,
    toolid = DEFAULT_EBAY.toolid,
    mkevt = DEFAULT_EBAY.mkevt
  } = {}) {
    if (!customId) throw new Error('customId is required');
    const u = ensureUrl(url);
    if (!/(^|\.)ebay\.com$/i.test(u.hostname)) throw new Error('eBay tracking can only be applied to ebay.com URLs');
    u.searchParams.set('mkcid', mkcid);
    u.searchParams.set('mkrid', mkrid);
    u.searchParams.set('siteid', siteid);
    u.searchParams.set('campid', campaignId);
    u.searchParams.set('customid', customId);
    u.searchParams.set('toolid', toolid);
    u.searchParams.set('mkevt', mkevt);
    return u.toString();
  }

  function buildEbaySearchLink({ query, platform, contentType = 'post', product, campaign = 'organic', date, variant, customId, campaignId = DEFAULT_EBAY.campaignId }) {
    if (!query) throw new Error('query is required');
    const id = customId || buildCustomId({ platform, contentType, product: product || query, campaign, date, variant });
    const u = new URL('https://www.ebay.com/sch/i.html');
    u.searchParams.set('_nkw', query);
    return { custom_id: id, url: applyEbayTracking(u.toString(), { campaignId, customId: id }) };
  }

  function buildEbayListingLink({ url, platform, contentType = 'post', product, campaign = 'organic', date, variant, customId, campaignId = DEFAULT_EBAY.campaignId }) {
    const id = customId || buildCustomId({ platform, contentType, product, campaign, date, variant });
    return { custom_id: id, url: applyEbayTracking(url, { campaignId, customId: id }) };
  }

  function buildStoreTrackedLink({ url, platform, contentType = 'post', product, campaign = 'organic', date, variant, medium = 'social' }) {
    const id = buildCustomId({ platform, contentType, product, campaign, date, variant });
    const u = ensureUrl(url);
    u.searchParams.set('utm_source', platformCode(platform));
    u.searchParams.set('utm_medium', slug(medium, 16));
    u.searchParams.set('utm_campaign', slug(campaign, 32));
    u.searchParams.set('utm_content', id);
    return { custom_id: id, url: u.toString() };
  }

  function linkForProduct(product, context = {}) {
    if (!product || typeof product !== 'object') throw new TypeError('product is required');
    const source = product.source_type;
    const name = product.product_name || product.product_id || 'product';

    if (source === 'ebay_epn_search') {
      const current = ensureUrl(product.affiliate_url);
      const query = current.searchParams.get('_nkw') || name;
      return buildEbaySearchLink({
        query,
        product: name,
        campaignId: product.campaign_id || DEFAULT_EBAY.campaignId,
        ...context
      });
    }

    if (source === 'ebay_listing') {
      return buildEbayListingLink({
        url: product.affiliate_url,
        product: name,
        campaignId: product.campaign_id || DEFAULT_EBAY.campaignId,
        ...context
      });
    }

    return buildStoreTrackedLink({ url: product.affiliate_url, product: name, ...context });
  }

  return {
    DEFAULT_EBAY,
    PLATFORM_CODES,
    slug,
    compactDate,
    platformCode,
    buildCustomId,
    applyEbayTracking,
    buildEbaySearchLink,
    buildEbayListingLink,
    buildStoreTrackedLink,
    linkForProduct
  };
});