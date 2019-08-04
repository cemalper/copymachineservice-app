import React from 'react';
import LookupInput from './LookupInput';
import { useQuery } from 'react-apollo-hooks';
import { CustomerLookupQueryType } from '../../graphql/customer-graphql';
import { Select } from 'antd';

const Option = Select.Option;

const CustomerLookupInput = props => (
  <LookupInput
    {...props}
    selectQuery={useQuery(CustomerLookupQueryType)}
    dataField="customers"
    optionFilterProp="_id"
    optionLabelProp="label"
    filterOption={(input, option) => option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    renderOption={option => (
      <Option key={option._id} value={option._id} label={`${option.code} - ${option.title}`}>
        {`${option.code} - ${option.title}`}
      </Option>
    )}
  />
);

export default CustomerLookupInput;
