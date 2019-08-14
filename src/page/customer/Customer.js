import React from 'react';
import { Tabs } from 'antd';
import Form from '../../view/customer/form/Customer';

const { TabPane } = Tabs;

const Customer = props => {
  return (
    <Tabs tabPosition="right">
      <TabPane tab="Kayıt" key="1">
        <Form {...props} />
      </TabPane>
      <TabPane tab="İlişkili Kayıtlar" key="2" />
    </Tabs>
  );
};

export default Customer;
