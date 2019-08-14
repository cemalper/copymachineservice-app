import React from 'react';
import { Tabs } from 'antd';
import Form from '../../view/device/form/Device';

const { TabPane } = Tabs;

const Device = props => {
  return (
    <Tabs tabPosition="right">
      <TabPane tab="Kayıt" key="1">
        <Form {...props} />
      </TabPane>
      <TabPane tab="İlişkili Kayıtlar" key="2" />
    </Tabs>
  );
};

export default Device;
