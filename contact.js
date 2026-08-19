(function(){
  const form = document.getElementById('lead-form');
  if (!form) return;

  const status = document.getElementById('lead-form-status');
  const button = form.querySelector('button[type="submit"]');
  const endpoint = 'https://formsubmit.co/ajax/Jason@prestigeremodelingwi.com';

  function setStatus(message, isError){
    if (!status) return;
    status.textContent = message;
    status.setAttribute('data-state', isError ? 'error' : 'success');
  }

  function buildMailto(data){
    const subject = `Website inquiry from ${data.name}`;
    const body = [
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email || 'Not provided'}`,
      `Project address/city: ${data.location || 'Not provided'}`,
      '',
      'Project or product inquiry:',
      data.details
    ].join('\n');
    return `mailto:Jason@prestigeremodelingwi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  form.addEventListener('submit', async function(event){
    event.preventDefault();

    const formData = new FormData(form);
    const honeypot = String(formData.get('company') || '').trim();
    if (honeypot) return;

    const lead = {
      name: String(formData.get('name') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      location: String(formData.get('location') || '').trim(),
      details: String(formData.get('details') || '').trim()
    };

    if (!lead.name || !lead.phone || !lead.details) {
      setStatus('Please enter your name, phone number, and project details.', true);
      return;
    }

    if (button) {
      button.disabled = true;
      button.textContent = 'Sending…';
    }
    setStatus('Sending your request…', false);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: lead.name,
          phone: lead.phone,
          email: lead.email || 'Not provided',
          location: lead.location || 'Not provided',
          details: lead.details,
          source: 'Contractor Tested Picks / Prestige website',
          page: window.location.href,
          _subject: `New website lead from ${lead.name}`,
          _template: 'table'
        })
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) {
        throw new Error(result.message || `Submission failed (${response.status})`);
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'lead_submit',
        lead_source: 'website_contact_form',
        page_path: window.location.pathname
      });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          lead_source: 'website_contact_form',
          page_path: window.location.pathname
        });
      }

      form.reset();
      setStatus('Request sent. Prestige has your project details and can follow up with you directly.', false);
    } catch (error) {
      console.error('Lead submission failed', error);
      const mailto = buildMailto(lead);
      setStatus('Direct submission did not go through. Use the email link below so your request is not lost.', true);
      if (status) {
        const separator = document.createTextNode(' ');
        const fallback = document.createElement('a');
        fallback.href = mailto;
        fallback.textContent = 'Send by email instead.';
        status.append(separator, fallback);
      }
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = 'Send Estimate Request';
      }
    }
  });
})();
