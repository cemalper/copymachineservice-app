import React from 'react';
import { Tabs } from 'antd';
import Form from '../../view/deviceCost/form/DeviceCost';

const { TabPane } = Tabs;

const DeviceCost = props => {
  return (
    <Tabs tabPosition="right">
      <TabPane tab="Kayıt" key="1">
        <Form {...props} />
      </TabPane>
      <TabPane tab="İlişkili Kayıtlar" key="2" />
    </Tabs>
  );
};

export default DeviceCost;
