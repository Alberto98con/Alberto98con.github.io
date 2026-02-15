/* Cookie Consent */
(function () {
    var btnAccept = document.getElementById('btn-accept-cookies');
    var banner = document.getElementById('cookie-banner');

    if (!banner || !btnAccept) return;

    window.dataLayer = window.dataLayer || [];

    if (!localStorage.getItem('cookies-aceptadas')) {
        banner.classList.add('active');
    } else {
        window.dataLayer.push({ 'event': 'cookies-aceptadas' });
    }

    btnAccept.addEventListener('click', function () {
        banner.classList.remove('active');
        localStorage.setItem('cookies-aceptadas', true);
        window.dataLayer.push({ 'event': 'cookies-aceptadas' });
    });
})();
