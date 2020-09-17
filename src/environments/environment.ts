import { firebaseApiKey } from 'keys';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: firebaseApiKey,
    authDomain: 'p-kin-startpage.firebaseapp.com',
    databaseURL: 'https://p-kin-startpage.firebaseio.com',
    projectId: 'p-kin-startpage',
    storageBucket: '',
    messagingSenderId: '527940148035',
    appId: '1:527940148035:web:4e28d49996dad044',
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
