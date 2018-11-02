const functions = require('firebase-functions');
const fetch = require('node-fetch');
const admin = require('firebase-admin');
const slack = require('slack');

const auth = require('./auth');
const slackFunctions = require('./slack');
const rehearsals = require('./rehearsals');
const google = require('./google');
const { env } = functions.config().shebot;

admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });

exports.ping = functions
  .region('europe-west1')
  .https.onRequest((request, response) => {
    response.send(`SHE slash commands up and running! v0.2.5`);
  });

exports.addAttendancePost = slackFunctions.addAttendancePost;
exports.oauth_redirect = auth.oauth_redirect;
exports.processAttendance = slackFunctions.processAttendance;
exports.postRehearsalMusic = slackFunctions.postRehearsalMusic;
exports.reportAttendance = slackFunctions.reportAttendance;
exports.authGoogleAPI = google.authGoogleAPI;
exports.googleOauthRedirect = google.googleOauthRedirect;

// eslint-disable-next-line
Date.prototype.format = function() {
  return `${this.getDate()}/${this.getMonth() + 1}/${this.getFullYear()}`;
};
