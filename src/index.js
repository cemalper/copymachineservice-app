import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
//import ApolloClient from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { from } from 'apollo-link';
import { ApolloProvider } from 'react-apollo-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

import App from './App';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  link: from([createHttpLink({ uri: process.env.REACT_APP_SERVER_URL })]),
  cache: new InMemoryCache({ addTypename: false })
});
const app = (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
