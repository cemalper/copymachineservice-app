import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
//import ApolloClient from 'apollo-boost';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthentationProvider } from './provider/AuthentationProvider';

const app = (
  <AuthentationProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthentationProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
