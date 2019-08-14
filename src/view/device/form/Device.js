import React, { useRef } from 'react';
import useReactRouter from 'use-react-router';
import { Spin, Alert } from 'antd';
import { Formik } from 'formik';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { DeviceQueryType, DevicesQueryType, SaveDeviceMutationType, DeleteDeviceMutationType } from '../../../graphql/device-graphql';
import FormRibbon from '../../../components/ribbons/FormRibbon';
import DeviceForm from '../../../components/form/DeviceForm';

const mapToApi = values => ({
  _id: values._id,
  code: values.code,
  brandName: values.brandName,
  model: values.model,
  serialNumber: values.serialNumber,
  colourType: values.colourType,
  deviceType: values.deviceType,
  customerId: values.customerId
});

const Device = props => {
  const entityName = 'device';
  const recordId = props.match.params.id;
  const { history } = useReactRouter();
  const formikRef = useRef(null);
  const fetchQuery = useQuery(DeviceQueryType, { variables: { _id: recordId }, fetchPolicy: 'cache-and-network' });
  const [saveMutation, { loading: isSaving, error: savingError }] = useMutation(SaveDeviceMutationType);
  const [deleteMutation, { loading: isDeleting, error: deletingError }] = useMutation(DeleteDeviceMutationType);

  const onNewButton = {
    onClick: () => {
      history.push(`/${entityName}/new`);
    }
  };

  const onSaveButton = {
    onClick: () => {
      formikRef.current.submitForm();
    },
    loading: isSaving,
    disabled: isSaving
  };

  const onDeleteButton = {
    onClick: async () => {
      deleteMutation({ variables: { _ids: [recordId] }, refetchQueries: () => [{ query: DevicesQueryType }] });
      history.push(`/${entityName}`);
    },
    loading: isDeleting,
    visible: !!recordId,
    disabled: isDeleting
  };
  return (
    <Spin spinning={fetchQuery.loading}>
      <FormRibbon onNewButton={onNewButton} onSaveButton={onSaveButton} onDeleteButton={onDeleteButton} />
      {savingError && <Alert message={`${savingError.message} ${savingError.stack}`} type="error" style={{ marginBottom: 20 }} />}
      {deletingError && <Alert message={`${deletingError.message} ${deletingError.stack}`} type="error" style={{ marginBottom: 20 }} />}
      <Formik
        ref={formikRef}
        enableReinitialize
        validationSchema={DeviceForm.validationSchema}
        initialValues={(fetchQuery.data && fetchQuery.data[Object.keys(fetchQuery.data)]) || DeviceForm.initialValues}
        isInitialValid={false}
        onSubmit={async (values, { setSubmitting }) => {
          await saveMutation({ variables: { data: mapToApi(values) }, refetchQueries: () => [{ query: DevicesQueryType }] });
          setSubmitting(false);
          history.push(`/${entityName}`);
        }}
        component={DeviceForm}
      />
    </Spin>
  );
};

export default Device;
