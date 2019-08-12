import React from 'react';
import LookupInput from './LookupInput';
import { useQuery } from 'react-apollo-hooks';
import { DeviceLookupQueryType } from '../../graphql/device-graphql';
import { Select } from 'antd';

const Option = Select.Option;

const CustomerLookupInput = props => (
  <LookupInput
    {...props}
    selectQuery={useQuery(DeviceLookupQueryType)}
    dataField="devices"
    optionFilterProp="_id"
    optionLabelProp="label"
    filterOption={(input, option) => option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    renderOption={option => (
      <Option key={option._id} value={option._id} label={`${option.code} - ${option.serialNumber} ${option.brandName} ${option.model}`}>
        {`${option.code} - ${option.serialNumber} ${option.brandName} ${option.model}`}
      </Option>
    )}
  />
);

export default CustomerLookupInput;
