import React from 'react';
import FormContainer from '../../components/form/FormContainer';
import DeviceForm from '../../components/form/DeviceForm';
import { DeviceQueryType, DevicesQueryType, SaveDeviceMutationType, DeleteDeviceMutationType } from '../../graphql/device-graphql';

const Customer = props => {
  const recordId = props.match.params.id;
  return (
    <FormContainer
      recordId={recordId}
      entityName="device"
      fetchQueryType={DeviceQueryType}
      fetchAllQueryType={DevicesQueryType}
      saveMutationType={SaveDeviceMutationType}
      deleteMutationType={DeleteDeviceMutationType}
      form={DeviceForm}
    />
  );
};

export default Customer;
