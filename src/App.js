import React, { useContext } from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { AuthentationContext } from './provider/AuthentationProvider';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import LoginPage from './page/login/Login';
import Customer from './page/customer/Customer';
import CustomerList from './page/customer/CustomerList';
import Counter from './page/counter/Counter';
import CounterList from './page/counter/CounterList';
import Device from './page/device/Device';
import DeviceList from './page/device/DeviceList';
import DeviceCost from './page/deviceCost/DeviceCost';
import DeviceCostList from './page/deviceCost/DeviceCostList';
import CppAgreement from './page/cppAgreement/CppAgreement';
import CppAgreementList from './page/cppAgreement/CppAgreementList';
import CppAgreementDevice from './page/cppAgreementDevice/CppAgreementDevice';
import CppAgreementDeviceList from './page/cppAgreementDevice/CppAgreementDeviceList';
import CppAgreementCost from './page/cppAgreementCost/CppAgreementCost';
import CppAgreementCostList from './page/cppAgreementCost/CppAgreementCostList';

//import entities from './contants/entityNames';

const MainPage = props => {
  var authentation = useContext(AuthentationContext);
  console.log(authentation.user);
  if (authentation.user) {
    return <AuthorizedPage {...props} />;
  }
  return <UnAuthorizedPage />;
};

const UnAuthorizedPage = props => <LoginPage />;

const AuthorizedPage = props => (
  <DefaultLayout>
    <Switch>
      <Route path="/customer/new" render={_props => <Customer {...props} {..._props} />} />
      <Route path="/customer/:id" render={_props => <Customer {...props} {..._props} />} />
      <Route path="/customer" render={_props => <CustomerList {...props} {..._props} />} />
      <Route path="/counter/new" render={_props => <Counter {...props} {..._props} />} />
      <Route path="/counter/:id" render={_props => <Counter {...props} {..._props} />} />
      <Route path="/counter" render={_props => <CounterList {...props} {..._props} />} />
      <Route path="/device/new" render={_props => <Device {...props} {..._props} />} />
      <Route path="/device/:id" render={_props => <Device {...props} {..._props} />} />
      <Route path="/device" render={_props => <DeviceList {...props} {..._props} />} />
      <Route path="/devicecost/new" render={_props => <DeviceCost {...props} {..._props} />} />
      <Route path="/devicecost/:id" render={_props => <DeviceCost {...props} {..._props} />} />
      <Route path="/devicecost" render={_props => <DeviceCostList {...props} {..._props} />} />
      <Route path="/agreement/cpp/cppagreement/new" render={_props => <CppAgreement {...props} {..._props} />} />
      <Route path="/agreement/cpp/cppagreement/:id" render={_props => <CppAgreement {...props} {..._props} />} />
      <Route path="/agreement/cpp/cppagreement" render={_props => <CppAgreementList {...props} {..._props} />} />
      <Route path="/agreement/cpp/cppagreementdevice/new" render={_props => <CppAgreementDevice {...props} {..._props} />} />
      <Route path="/agreement/cpp/cppagreementdevice/:id" render={_props => <CppAgreementDevice {...props} {..._props} />} />
      <Route path="/agreement/cpp/cppagreementdevice" render={_props => <CppAgreementDeviceList {...props} {..._props} />} />
      <Route path="/agreement/cpp/cppagreementcost/new" render={_props => <CppAgreementCost {...props} {..._props} />} />
      <Route path="/agreement/cpp/cppagreementcost/:id" render={_props => <CppAgreementCost {...props} {..._props} />} />
      <Route path="/agreement/cpp/cppagreementcost" render={_props => <CppAgreementCostList {...props} {..._props} />} />
    </Switch>
  </DefaultLayout>
);
const httpLink = createHttpLink({ uri: process.env.REACT_APP_SERVER_URL });

function App(props) {
  const userInfo = useContext(AuthentationContext);
  const withToken = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: userInfo.user ? `Bearer ${userInfo.user.token}` : ''
      }
    };
  });

  const resetToken = onError(({ networkError }) => {
    if (networkError) {
      try {
        JSON.parse(networkError.bodyText);
      } catch (e) {
        networkError.message = networkError.bodyText;
      }
    }
    if (networkError && networkError.statusCode === 401) {
      userInfo.logout(client);
      client.resetStore();
    }
  });

  const client = new ApolloClient({
    link: withToken.concat(resetToken).concat(httpLink),
    cache: new InMemoryCache({ addTypename: false })
  });
  console.log(userInfo);
  return (
    <ApolloProvider client={client}>
      <MainPage />
    </ApolloProvider>
  );
}

export default App;
