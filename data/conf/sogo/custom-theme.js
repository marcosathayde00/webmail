/* PorterMail: tema do SOGo (Angular Material) usando os design tokens DTCG
   (Bangs & Bangues) - mesma paleta aplicada nas telas de login do mailcow. */
(function() {
  'use strict';
  angular.module('SOGo.Common')
    .config(configure)

  configure.$inject = ['$mdThemingProvider'];
  function configure($mdThemingProvider) {
    var porterPrimary = $mdThemingProvider.extendPalette('indigo', {
      '50': 'EEF1FE',
      '100': 'D6DDFD',
      '200': '97A6E6',
      '300': '7387DF',
      '400': '556DE1',
      '500': '384AA0',
      '600': '304CDF',
      '700': '263FA9',
      '800': '1B2C73',
      '900': '131E42',
      'A100': '97A6E6',
      'A200': '7387DF',
      'A400': '556DE1',
      'A700': '1B2C73'
    });
    var porterBackground = $mdThemingProvider.extendPalette('grey', {
      '50': 'F7F8FA',
      '100': 'EAEBED'
    });
    $mdThemingProvider.definePalette('porter-primary', porterPrimary);
    $mdThemingProvider.definePalette('porter-background', porterBackground);
    $mdThemingProvider.theme('default')
      .primaryPalette('porter-primary', {
        'default': '500',
        'hue-1': '300',
        'hue-2': '700',
        'hue-3': '800'
      })
      .accentPalette('porter-primary', {
        'default': '700',
        'hue-1': '400',
        'hue-2': '400',
        'hue-3': '800'
      })
      .backgroundPalette('porter-background');
    $mdThemingProvider.generateThemesOnDemand(false);
  }
})();
