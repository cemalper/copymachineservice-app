import React from 'react';
import LookupInput from './LookupInput';
import { useQuery } from 'react-apollo-hooks';
import { CppAgreementLookupQueryType } from '../../graphql/cppAgreement-graphql';
import { Select } from 'antd';
import { buildCppAgreementName } from '../../utils/buildName';

const Option = Select.Option;

const CustomerLookupInput = props => (
  <LookupInput
    {...props}
    selectQuery={useQuery(CppAgreementLookupQueryType)}
    dataField="cppAgreements"
    optionFilterProp="_id"
    optionLabelProp="label"
    filterOption={(input, option) => option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    renderOption={option => (
      <Option key={option._id} value={option._id} label={buildCppAgreementName(option.code, option.customer.title)}>
        {buildCppAgreementName(option.code, option.customer.title)}
      </Option>
    )}
  />
);

export default CustomerLookupInput;
