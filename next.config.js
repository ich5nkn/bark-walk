// On production, variables are set with `now secrets`. On development, they use the .env file
require('dotenv').config();

module.exports = {
  env: {
    FIREBASE_API_KEY: 'AIzaSyBj4BJf4yV78ZqBk_sCL9W8b7yAjwSGeMs',
    FIREBASE_AUTH_DOMAIN: 'bark-wark.firebaseapp.com',
    FIREBASE_DATABASE_URL: 'https://bark-wark.firebaseio.com',
    FIREBASE_PROJECT_ID: 'bark-wark',
    FIREBASE_STORAGE_BUCKET: 'bark-wark.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '983292527509',
    FIREBASE_APP_ID: '1:983292527509:web:cd6bd383427927a06bac9c',
  },
};
