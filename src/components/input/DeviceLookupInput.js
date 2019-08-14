import React from 'react';
import LookupInput from './LookupInput';
import { useQuery } from 'react-apollo-hooks';
import { DeviceLookupQueryType } from '../../graphql/device-graphql';
import { Select } from 'antd';
import { buildDeviceName } from '../../utils/buildName';
const Option = Select.Option;

const CustomerLookupInput = props => (
  <LookupInput
    {...props}
    selectQuery={useQuery(DeviceLookupQueryType, { fetchPolicy: 'network-only' })}
    dataField="devices"
    optionFilterProp="_id"
    optionLabelProp="label"
    filterOption={(input, option) => option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    renderOption={option => (
      <Option key={option._id} value={option._id} label={buildDeviceName(option)}>
        {buildDeviceName(option)}
      </Option>
    )}
  />
);

export default CustomerLookupInput;
