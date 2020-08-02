const express = require('express');
const voiceit2 = require('voiceit2-nodejs');
const myVoiceIt = new voiceit2('key_42866674a3014801ba72071f04ddc35a', 'tok_9577d0cbc735457f8a7fbd54c4f2b1aa');
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
    userId : req.userId
  },(jsonResponse)=>{
    res.send(jsonResponse.exists);
  });
})

app.post('/check_enrollments', (req, res) => {
  myVoiceIt.getAllVoiceEnrollments({
    userId : req.userId
  },(jsonResponse)=>{
    res.send(jsonResponse);
  });
})

app.post('/verify', (req, res) => {
  myVoiceIt.voiceVerification({
    userId : req.userId,
    contentLanguage : 'en-US',
    phrase : 'Never forget tomorrow is a new day',
    audioFilePath : 'enrollments/recording.wav'
  },(jsonResponse)=>{
    res.send(jsonResponse);
  });
})

app.get('/create_enrollment', (req, res) => {
  myVoiceIt.createVoiceEnrollment({
    userId : req.userId,
    contentLanguage : 'en-US',
    phrase : 'Never forget tomorrow is a new day',
    audioFilePath : 'enrollments/recording.wav'
  },(jsonResponse)=>{
    res.send(jsonResponse);
    console.log(jsonResponse);
  });
})

app.get('/delete', (req, res) => {
  myVoiceIt.deleteAllEnrollments({
    userId : req.userId
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