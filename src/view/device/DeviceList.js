import React from 'react';
import Table from '../table/Table';
import { DevicesQueryType, DeleteDeviceMutationType } from '../../graphql/device-graphql';
import { deviceColourTypePair, brandNamesPair, deviceTypePair } from 'common/enums';
const columns = [
  {
    title: 'Kod',
    dataIndex: 'code',
    key: 'code',
    sorter: true
    //width: '20%'
  },
  {
    title: 'Seri Numara',
    dataIndex: 'serialNumber',
    key: 'serialNumber'
  },
  {
    title: 'Marka',
    dataIndex: 'brandName',
    key: 'brandName',
    sorter: true,
    filters: brandNamesPair,
    render: (text, record, index) => (text && brandNamesPair.find(x => x.value === text).text) || ''
  },
  {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
    sorter: true
  },
  {
    title: 'Tip',
    dataIndex: 'deviceType',
    key: 'deviceType',
    filters: deviceTypePair,
    render: (text, record, index) => (text && deviceTypePair.find(x => x.value === text).text) || ''
  },
  {
    title: 'Renk',
    dataIndex: 'colourType',
    key: 'colourType',
    filters: deviceColourTypePair,
    render: (text, record, index) => (text && deviceColourTypePair.find(x => x.value === text).text) || ''
  }
];
const Customers = props => {
  return (
    <Table
      entityName={'device'}
      entityDisplayName={'Cihaz'}
      columns={columns}
      fetchQueryType={DevicesQueryType}
      deleteMutationType={DeleteDeviceMutationType}
    />
  );
};

export default Customers;
