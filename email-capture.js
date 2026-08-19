(() => {
  const KLAVIYO_COMPANY_ID = 'RKq7wA';
  const KLAVIYO_LIST_ID = 'SJ8FBv';
  const ENDPOINT = `https://a.klaviyo.com/client/subscriptions?company_id=${encodeURIComponent(KLAVIYO_COMPANY_ID)}`;

  function showSuccess(form, status) {
    if (!status) return;
    status.textContent = 'Check your inbox to confirm your subscription.';

    const downloadUrl = form.dataset.downloadUrl;
    if (!downloadUrl) return;

    const spacer = document.createTextNode(' ');
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.textContent = form.dataset.downloadLabel || 'Open your free resource.';
    link.setAttribute('data-lead-magnet-link', 'true');
    status.append(spacer, link);
  }

  async function subscribe(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const firstNameInput = form.querySelector('[name="first_name"]');
    const status = form.querySelector('[data-capture-status]');
    const button = form.querySelector('button[type="submit"]');
    const email = emailInput?.value.trim();
    const firstName = firstNameInput?.value.trim() || '';

    if (!email) return;

    if (status) status.textContent = 'Submitting…';
    if (button) button.disabled = true;

    const source = form.dataset.source || 'Contractor Tested Picks website';
    const leadMagnet = form.dataset.downloadUrl || '';
    const payload = {
      data: {
        type: 'subscription',
        attributes: {
          custom_source: source,
          profile: {
            data: {
              type: 'profile',
              attributes: {
                email,
                ...(firstName ? { first_name: firstName } : {}),
                locale: 'en-US',
                properties: {
                  'CTP Signup Source': source,
                  'CTP Signup Page': window.location.pathname,
                  ...(leadMagnet ? { 'CTP Lead Magnet': leadMagnet } : {})
                },
                subscriptions: {
                  email: {
                    marketing: { consent: 'SUBSCRIBED' }
                  }
                }
              }
            }
          }
        },
        relationships: {
          list: {
            data: { type: 'list', id: KLAVIYO_LIST_ID }
          }
        }
      }
    };

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'content-type': 'application/vnd.api+json',
          revision: '2026-07-15'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`Klaviyo subscription failed: ${response.status}`);

      form.reset();
      showSuccess(form, status);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'email_signup_submitted', source, lead_magnet: leadMagnet || undefined });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'email_signup_submitted', {
          signup_source: source,
          lead_magnet: leadMagnet || undefined,
          page_path: location.pathname
        });
      }
    } catch (error) {
      console.error(error);
      if (status) status.textContent = 'Something went wrong. Please try again or use the contact page.';
    } finally {
      if (button) button.disabled = false;
    }
  }

  document.querySelectorAll('[data-email-capture]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      subscribe(form);
    });
  });
})();
