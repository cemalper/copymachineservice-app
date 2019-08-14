import React from 'react';
import PropTypes from 'prop-types';
import { deviceColourTypePair, brandNamesPair, deviceTypePair } from 'common/enums';
import { useQuery } from 'react-apollo-hooks';
import { Card } from 'antd';
import SubTable from '../../table/SubTable';
import { CustomerDevicesQueryType, DeleteDeviceMutationType } from '../../../graphql/device-graphql';

const entityName = 'device';
const columns = [
  {
    title: 'Kod',
    dataIndex: 'code',
    sorter: true
  },
  {
    title: 'Seri Numara',
    dataIndex: 'serialNumber'
  },
  {
    title: 'Marka',
    dataIndex: 'brandName',
    sorter: true,
    filters: brandNamesPair,
    render: (text, record, index) => (text && brandNamesPair.find(x => x.value === text).text) || ''
  },
  {
    title: 'Model',
    dataIndex: 'model',
    sorter: true
  },
  {
    title: 'Tip',
    dataIndex: 'deviceType',
    filters: deviceTypePair,
    render: (text, record, index) => (text && deviceTypePair.find(x => x.value === text).text) || ''
  },
  {
    title: 'Renk',
    dataIndex: 'colourType',
    filters: deviceColourTypePair,
    render: (text, record, index) => (text && deviceColourTypePair.find(x => x.value === text).text) || ''
  }
];

const CustomerDeviceView = props => {
  const customerId = props.customerId;
  const fetchQuery = useQuery(CustomerDevicesQueryType, { variables: { customerId }, fetchPolicy: 'cache-and-network' });
  return (
    <Card title="Cihaz" size="small">
      <SubTable
        columns={columns}
        fetchQuery={fetchQuery}
        deleteMutationType={DeleteDeviceMutationType}
        entityName={entityName}
        queryString={`customerId=${customerId}`}
      />
      ;
    </Card>
  );
};

CustomerDeviceView.propTypes = {
  name: PropTypes.string.isRequired,
  customerId: PropTypes.string.isRequired
};

export default CustomerDeviceView;
