import React from 'react';
import FormContainer from '../../components/form/FormContainer';
import CustomerForm from '../../components/form/CustomerForm';
import { CustomerQueryType, CustomersQueryType, SaveCustomerMutationType, DeleteCustomerMutationType } from '../../graphql/customer-graphql';

const Customer = props => {
  const recordId = props.match.params.id;
  return (
    <FormContainer
      recordId={recordId}
      entityName="customer"
      fetchQueryType={CustomerQueryType}
      fetchAllQueryType={CustomersQueryType}
      saveMutationType={SaveCustomerMutationType}
      deleteMutationType={DeleteCustomerMutationType}
      form={CustomerForm}
    />
  );
};

export default Customer;
