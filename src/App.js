import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import Customer from './view/customer/Customer';
import CustomerList from './view/customer/CustomerList';
import Device from './view/device/Device';
import DeviceList from './view/device/DeviceList';
import CppAgreement from './view/cppAgreement/CppAgreement';
import CppAgreementList from './view/cppAgreement/CppAgreementList';
import CppAgreementDevice from './view/cppAgreementDevice/CppAgreementDevice';
import CppAgreementDeviceList from './view/cppAgreementDevice/CppAgreementDeviceList';

//import entities from './contants/entityNames';

function App(props) {
  return (
    <DefaultLayout>
      <Switch>
        <Route path="/customer/new" render={_props => <Customer {...props} {..._props} />} />
        <Route path="/customer/:id" render={_props => <Customer {...props} {..._props} />} />
        <Route path="/customer" render={_props => <CustomerList {...props} {..._props} />} />
        <Route path="/device/new" render={_props => <Device {...props} {..._props} />} />
        <Route path="/device/:id" render={_props => <Device {...props} {..._props} />} />
        <Route path="/device" render={_props => <DeviceList {...props} {..._props} />} />
        <Route path="/agreement/cpp/cppagreement/new" render={_props => <CppAgreement {...props} {..._props} />} />
        <Route path="/agreement/cpp/cppagreement/:id" render={_props => <CppAgreement {...props} {..._props} />} />
        <Route path="/agreement/cpp/cppagreement" render={_props => <CppAgreementList {...props} {..._props} />} />
        <Route path="/agreement/cpp/cppagreementdevice/new" render={_props => <CppAgreementDevice {...props} {..._props} />} />
        <Route path="/agreement/cpp/cppagreementdevice/:id" render={_props => <CppAgreementDevice {...props} {..._props} />} />
        <Route path="/agreement/cpp/cppagreementdevice" render={_props => <CppAgreementDeviceList {...props} {..._props} />} />
      </Switch>
    </DefaultLayout>
  );
}

export default App;
