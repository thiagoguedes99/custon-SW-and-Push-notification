import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

const config = {
  onUpdate: async (registration) => {

    console.log('deu certo => OBJ DE SW !!!!')
    console.log(registration)

    const vapidPublicKey = 'BG-4nSZPc9YQwOH9EXc3gDCNJC_syevig3mjgK2ASxm0yjZwAU_ukyKi4FvjS3OiOrqouqm775BJ29AWtGzmIbc';

    function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
     
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
     
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }
     
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
     
    console.log('vai enviar a subscrição')
    registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    })
    .then(resp => {
      console.log('show foi!!!')
  
      fetch('http://localhost:5000/sub', {
        method: 'POST',
        body: JSON.stringify(resp),
        headers: {
          'content-type': 'application/json'
        }
      })

    })
    .catch(resp => {
      console.log('deu ruim....')
      console.log(resp)
    })




  }
};


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register(config);

/** register permission of push notifications */
navigator.serviceWorker && Notification.requestPermission(status => {
  console.log('Notification permission status:', status);
});
