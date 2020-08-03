const express = require('express');
const voiceit2 = require('voiceit2-nodejs');
const myVoiceIt = new voiceit2('key_c6b9c9b490e945e282b620fcc63851dc', 'tok_9f587208922142c180ce120fe1855fca');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send([{message: 'You Rock!!!'}]);
});

app.get('/create_user', (req, res) => {
  myVoiceIt.createUser((jsonResponse)=>{
    res.send(jsonResponse);
  });
});

app.get('/check_user', (req, res) => {
  myVoiceIt.checkUserExists({
    userId : 'usr_d2c38388e1df4af7b851a896770c3034'
  },(jsonResponse)=>{
    res.send(jsonResponse.exists);
  });
})

app.post('/check_enrollments', (req, res) => {
  myVoiceIt.getAllVoiceEnrollments({
    userId : req.body.userId
  },(jsonResponse)=>{
    res.send(jsonResponse);
  });
})

app.post('/verify', (req, res) => {
  myVoiceIt.voiceVerificationByUrl({
    userId : req.body.userId,
    contentLanguage : 'en-US',
    phrase : 'Never forget tomorrow is a new day',
    audioFileURL : req.body.audioURL
  },(jsonResponse)=>{
    res.send(jsonResponse);
  });
})

app.post('/create_enrollment', (req, res) => {
  myVoiceIt.createVoiceEnrollmentByUrl({
    userId : req.body.userId,
    contentLanguage : 'en-US',
    phrase : 'Never forget tomorrow is a new day',
    audioFileURL : req.body.audioURL
  },(jsonResponse)=>{
    res.send(jsonResponse);
  });
})

app.get('/delete', (req, res) => {
  myVoiceIt.deleteAllEnrollments({
    userId : 'usr_82c9d2436fc94999ada374803133d493'
  },(jsonResponse)=>{
    res.send(jsonResponse);
  });
})

app.get('/phrases', (req, res) => {
  myVoiceIt.getPhrases({ contentLanguage : 'en-US' }, (jsonResponse)=>{
    res.send(jsonResponse);
  });
})

app.listen(4201, '127.0.0.1', () => {
  console.log('Server now listening on 4201');
})