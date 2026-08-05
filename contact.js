(function(){
  const form = document.getElementById('lead-form');
  if (!form) return;
  form.addEventListener('submit', function(event){
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const email = String(data.get('email') || '').trim();
    const location = String(data.get('location') || '').trim();
    const details = String(data.get('details') || '').trim();
    const subject = `Website inquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || 'Not provided'}`,
      `Project address/city: ${location || 'Not provided'}`,
      '',
      'Project or product inquiry:',
      details
    ].join('\n');
    window.location.href = `mailto:Jason@prestigeremodelingwi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
