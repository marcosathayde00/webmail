// redirect to mailcow login form
// PorterMail: alvo trocado de /user pra / - /user foi desativado (self-service
// removido), redirecionar pra la causaria loop (/user manda de volta pro SOGo).
document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.forms.namedItem("loginForm");
    if (loginForm) {
        window.location.href = '/';
    }
});
// logout function
function mc_logout() {
    fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "logout=1"
    }).then(() => window.location.href = '/');
}

// Custom SOGo JS

// PorterMail: mesma fonte (Poppins) e cor de marca usadas na tela de login do mailcow -
// SOGo nao tem hook de CSS custom como o mailcow, entao injeta direto (custom-theme.js
// so cobre a paleta de cor do Angular Material, nao tipografia).
(function () {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
  document.head.appendChild(link);

  var style = document.createElement('style');
  style.textContent =
    "body, .md-body-1, .md-body-2, .md-title, .md-subhead, .md-button, .md-input, md-toolbar, md-sidenav { font-family: 'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif !important; }" +
    /* PorterMail: cor de marca forcada via CSS (o tema dinamico do Angular Material via
       $mdThemingProvider em theme.js nao surtiu efeito visivel nesses elementos - esse
       override direto e garantido, nao depende do ciclo de vida do theming provider). */
    "md-toolbar, md-toolbar.md-default-theme, .md-toolbar-tools { background-color: #384AA0 !important; color: #fff !important; }" +
    "md-toolbar md-icon, md-toolbar .md-icon-button, md-toolbar a, md-toolbar button { color: #fff !important; }" +
    "button.md-fab, .md-fab.md-default-theme, md-fab-speed-dial .md-fab-trigger button { background-color: #263FA9 !important; color: #fff !important; }" +
    "md-sidenav, .md-sidenav-left { background-color: #F7F8FA !important; }" +
    "md-content .selected, md-list-item.selected, .navigation-folder-selected { background-color: #EEF1FE !important; color: #384AA0 !important; }" +
    "a, .ui-selected { color: #384AA0; }";
  document.head.appendChild(style);
})();

// Change the visible font-size in the editor, this does not change the font of a html message by default
CKEDITOR.addCss("body {font-size: 16px !important} body {font-family: 'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif !important}");

// Enable scayt by default
//CKEDITOR.config.scayt_autoStartup = true;

