const express = require('express');
const bodyParser = require('body-parser');

const { getDbOrConfigValue, getDbOrConfigValues } = require('./utils');

const {
  addAttendancePost,
  processAttendance,
  postRehearsalMusic,
  testSlackIntegration
} = require('./slack');

const { oauth_redirect } = require('./auth');
const { getAttendanceReport } = require('./attendance');
const { testGoogleIntegration, putGoogleCredentials } = require('./google');

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send('Hello world! SHEbot v1.1');
});

app.get('/attendance', addAttendancePost);
app.get('/process', processAttendance);
app.get('/rehearsals', postRehearsalMusic);
app.get('/test-slack', testSlackIntegration);
app.get('/test-google', testGoogleIntegration);
app.put('/google-creds', putGoogleCredentials);
app.get('/report', getAttendanceReport);
app.get('/oauth_redirect', oauth_redirect);
const PORT = process.env.PORT || 6060;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
