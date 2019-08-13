import React, { useRef } from 'react';
import useReactRouter from 'use-react-router';
import { Spin, Alert } from 'antd';
import { Formik } from 'formik';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { DeviceCostQueryType, DeviceCostsQueryType, SaveDeviceCostMutationType, DeleteDeviceCostMutationType } from '../../graphql/deviceCost-graphql';
import FormRibbon from '../../components/ribbons/FormRibbon';
import Form from '../../components/form/DeviceCostForm';

/*
_id
deviceId
cppAgreementId
deviceCostType
name
amount
unitPrice
totalPrice
date
createdOn
comment
*/
const mapToApi = values => ({
  _id: values._id,
  deviceId: values.deviceId,
  cppAgreementId: values.cppAgreementId,
  deviceCostType: values.deviceCostType,
  name: values.name,
  amount: values.amount,
  unitPrice: values.unitPrice,
  totalPrice: values.totalPrice,
  date: values.date,
  comment: values.comment
});

const DeviceCost = props => {
  const entityName = 'deviceCost';
  const recordId = props.match.params.id;
  const { history } = useReactRouter();
  const formikRef = useRef(null);
  const fetchQuery = useQuery(DeviceCostQueryType, { variables: { _id: recordId } });
  const [saveMutation, { loading: isSaving, error: savingError }] = useMutation(SaveDeviceCostMutationType);
  const [deleteMutation, { loading: isDeleting, error: deletingError }] = useMutation(DeleteDeviceCostMutationType);

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
      deleteMutation({ variables: { _ids: [recordId] }, refetchQueries: () => [{ query: DeviceCostsQueryType }] });
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
        initialValues={(fetchQuery.data && fetchQuery.data[Object.keys(fetchQuery.data)]) || {}}
        isInitialValid={false}
        onSubmit={async (values, { setSubmitting }) => {
          await saveMutation({ variables: { data: mapToApi(values) }, refetchQueries: () => [{ query: DeviceCostsQueryType }] });
          setSubmitting(false);
          history.push(`/${entityName}`);
        }}
        component={Form}
      />
    </Spin>
  );
};

export default DeviceCost;
