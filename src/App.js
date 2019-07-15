import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import Customer from './view/customer/Customer';
import CustomerList from './view/customer/CustomerList';
import Device from './view/device/Device';
import DeviceList from './view/device/DeviceList';

import entities from './contants/entityNames';

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
      </Switch>
    </DefaultLayout>
  );
}

export default App;
