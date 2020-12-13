// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  sceneTypesUrl: 'http://localhost:8080/src',
  playerUrl: '//192.168.198.139/kiddo-player.js',
  playerAssetsUrl: '//192.168.198.139/assets',
  localStorageKeys: {
    selectedLanguage: 'kiddoAcademyLanguage',
    lastSelectedSceneTabNumber: 'kiddo-academy_last-selected-tab',
    levelConfig: 'kiddo-academy_level-config',
  },
  googleAnalyticsKey: '',
  googleAnalyticsEvents: {
    info: 'INFO',
    buttonClick: 'BUTTON_CLICK',
    tabClick: 'TAB_CLICK',
    dropdownClick: 'DROPDOWN_CLICK',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
