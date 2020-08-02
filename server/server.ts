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
  res.send([{message: 'Hello World!'}]);
});

app.get('/create_user', (req, res) => {
  myVoiceIt.createUser((jsonResponse)=>{
    // console.log(jsonResponse);
    res.send(jsonResponse);
    // const userId = jsonResponse[userId]; // Save generated userId to use later
  });
});

app.get('/enroll', (req, res) => {
  myVoiceIt.createVoiceEnrollment({
    userId : 'usr_9f09e91ed9114bf683844bc923a17306',
    contentLanguage : 'en-US',
    phrase : 'Never forget tomorrow is a new day',
    audioFilePath : 'enrollments/three.wav'
  },(jsonResponse)=>{
    res.send(jsonResponse);
    console.log(jsonResponse);
  });
})

app.get('/delete', (req, res) => {
  myVoiceIt.deleteAllEnrollments({
    userId : 'usr_9f09e91ed9114bf683844bc923a17306'
  },(jsonResponse)=>{
    res.send(jsonResponse);
  });
})

app.get('/phrases', (req, res) => {
  myVoiceIt.getPhrases({ contentLanguage : 'en-US' }, (jsonResponse)=>{
    // console.log(jsonResponse);
    res.send(jsonResponse);
  });
})

app.get('/verify', (req, res) => {
  myVoiceIt.voiceVerification({
    userId : 'usr_9f09e91ed9114bf683844bc923a17306',
    contentLanguage : 'en-US',
    phrase : 'Never forget tomorrow is a new day',
    audioFilePath : 'enrollments/fake.wav'
  },(jsonResponse)=>{
    res.send(jsonResponse);
  });
})

app.post('/user', (req, res) => {
  res.send({body: req.body});
});

app.listen(4201, '127.0.0.1', () => {
  console.log('Server now listening on 4201');
})