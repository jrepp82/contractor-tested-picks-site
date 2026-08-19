(() => {
  const KLAVIYO_COMPANY_ID = 'RKq7wA';
  const KLAVIYO_LIST_ID = 'SJ8FBv';
  const ENDPOINT = `https://a.klaviyo.com/client/subscriptions?company_id=${encodeURIComponent(KLAVIYO_COMPANY_ID)}`;

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
                  'CTP Signup Page': window.location.pathname
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
      if (status) status.textContent = 'Check your inbox to confirm your subscription.';
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'email_signup_submitted', source });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'email_signup_submitted', { signup_source: source, page_path: location.pathname });
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
