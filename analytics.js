(function () {
  const id = window.CTP_ANALYTICS?.ga4MeasurementId?.trim();
  if (!id || !/^G-[A-Z0-9]+$/i.test(id)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: true });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
})();
