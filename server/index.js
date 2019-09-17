const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const accessControl = require('./access-Control');

const app = express();

app.use(bodyParser.json());
app.use(accessControl.access);


const vapidPublicKey = 'BG-4nSZPc9YQwOH9EXc3gDCNJC_syevig3mjgK2ASxm0yjZwAU_ukyKi4FvjS3OiOrqouqm775BJ29AWtGzmIbc';
const vapidPrivateKey = 'IR_QmxUinFc5NHhvcZ3IWVYribq056rz91ErimOIf3s';
let mySubscription = ''

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidPublicKey,
  vapidPrivateKey
);

const saveToDatabase = subscription => {
	mySubscription = subscription
}

const sendNotification = (payload) => {
    const data = JSON.stringify(payload);
  try
	{
    webPush.sendNotification(mySubscription, data).catch(err => {
      console.log('deu ruim aqui!!!!!! => ' + err)
      console.log(err)
    });
    
		console.log("Sent finally")
	}
	catch(err)
	{
		console.log("New Error 2",err)
	}
}


app.get('/send', (req, res) => {
console.log('vai mandar via /send antes')

sendNotification({ title: 'Título enviado pelo back', body: 'corpo do conteúdo enviado pelo back' })

  res.status(201).json({});

  console.log('vai mandar via /send')
});


app.post('/sub', (req, res) => {
  const subscription = req.body;

  saveToDatabase(subscription)

  console.log('vai mandar via /sub antes')

  res.status(201).json({});
});

const port = 5000;

app.listen(port, () => {
  console.log(`server listen in port ${port}`)
})
 