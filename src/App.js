import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
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

function App(props) {
  return (
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
}

export default App;
