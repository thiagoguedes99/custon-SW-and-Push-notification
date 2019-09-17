import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const requestPush = () => {
    console.log('vai enviar o push');

    fetch('http://localhost:5000/send', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <a href="https://karannagupta.com/using-custom-workbox-service-workers-with-create-react-app/">
          link da descrição de criar o SW personalizado.
        </a>

        <br />

        <a href="https://www.npmjs.com/package/web-push">
          link da documentação do web-push.
        </a>
        <p>mmmqqqtesteaaaaaa</p>
        <button onClick={() => requestPush()}>send push</button>
      </header>
    </div>
  );
}

export default App;
