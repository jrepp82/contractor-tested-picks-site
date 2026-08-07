(function(){
  const storageKey = 'ctp_affiliate_clicks';
  const rows = document.getElementById('event-rows');
  const table = document.getElementById('event-table');
  const empty = document.getElementById('empty-state');
  const storedCount = document.getElementById('stored-count');
  const dataLayerCount = document.getElementById('datalayer-count');
  const listenerStatus = document.getElementById('listener-status');
  const storageStatus = document.getElementById('storage-status');

  function safeEvents(){
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || '[]');
      storageStatus.textContent = 'Available';
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      storageStatus.textContent = 'Unavailable';
      return [];
    }
  }

  function escapeHtml(value){
    return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }

  function render(){
    const events = safeEvents().slice().reverse();
    storedCount.textContent = String(events.length);
    const dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    dataLayerCount.textContent = String(dataLayer.filter(item => item && item.event === 'affiliate_outbound_click').length);

    if (!events.length) {
      table.style.display = 'none';
      empty.style.display = 'block';
      rows.innerHTML = '';
      return;
    }

    empty.style.display = 'none';
    table.style.display = 'table';
    rows.innerHTML = events.map(event => {
      const destination = escapeHtml(event.destination || '');
      const label = destination ? new URL(event.destination).hostname : '';
      return `<tr>
        <td style="padding:.75rem;border-top:1px solid rgba(255,255,255,.12)">${escapeHtml(new Date(event.timestamp).toLocaleString())}</td>
        <td style="padding:.75rem;border-top:1px solid rgba(255,255,255,.12)">${escapeHtml(event.product_name)}</td>
        <td style="padding:.75rem;border-top:1px solid rgba(255,255,255,.12)">${escapeHtml(event.category)}</td>
        <td style="padding:.75rem;border-top:1px solid rgba(255,255,255,.12)">${escapeHtml(event.page_path)}</td>
        <td style="padding:.75rem;border-top:1px solid rgba(255,255,255,.12)"><a href="${destination}" target="_blank" rel="noopener">${escapeHtml(label)}</a></td>
      </tr>`;
    }).join('');
  }

  window.addEventListener('ctp:affiliate-click', function(){
    listenerStatus.textContent = 'Event received';
    render();
  });

  document.getElementById('refresh-events').addEventListener('click', render);
  document.getElementById('clear-events').addEventListener('click', function(){
    try { localStorage.removeItem(storageKey); } catch (error) {}
    render();
  });

  listenerStatus.textContent = 'Listening';
  render();
})();