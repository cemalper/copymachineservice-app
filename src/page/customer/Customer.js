import React from 'react';
import { Tabs } from 'antd';
import Form from '../../view/customer/form/Customer';
import CustomerDeviceView from '../../view/device/list/CustomerDeviceView';

const { TabPane } = Tabs;

const Customer = props => {
  var recordId = props.match.params.id;
  return (
    <Tabs tabPosition="right">
      <TabPane tab="Kayıt" key="1">
        <Form {...props} />
      </TabPane>
      {recordId && (
        <TabPane tab="İlişkili Kayıtlar" key="2">
          <CustomerDeviceView customerId={recordId} />
        </TabPane>
      )}
    </Tabs>
  );
};

export default Customer;
