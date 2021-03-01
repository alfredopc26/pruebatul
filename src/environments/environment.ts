// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const firebaseConfig = {
  apiKey: "AIzaSyBMF47S9AxVUw4J0GQCwN1pUVIjI0jXWhg",
  authDomain: "pruebatul-1d6f2.firebaseapp.com",
  databaseURL: "https://pruebatul-1d6f2-default-rtdb.firebaseio.com",
  projectId: "pruebatul-1d6f2",
  storageBucket: "pruebatul-1d6f2.appspot.com",
  messagingSenderId: "961744993686",
  appId: "1:961744993686:web:b0fbb7c7f017baf39ff1b7",
  measurementId: "G-BTZCZTW4NQ"
};

export const environment = {
  production: false,
  firebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
