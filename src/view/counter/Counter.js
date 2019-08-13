import React, { useRef } from 'react';
import useReactRouter from 'use-react-router';
import { Spin, Alert } from 'antd';
import { Formik } from 'formik';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { CounterQueryType, CountersQueryType, SaveCounterMutationType, DeleteCounterMutationType } from '../../graphql/counter-graphql';
import FormRibbon from '../../components/ribbons/FormRibbon';
import Form from '../../components/form/CounterForm';
//TODOs: maptoApi, form yapılacak counter için bir input yapılmalı mı? ödeme girerken aynısı kullanılabilir mi?
/*
deviceId
      colour {
        A5
        A4
        A3
      }
      black {
        A5
        A4
        A3
      }
      date
      device {
        _id
        serialNumber
        brandName
        model
      }
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
  const entityName = 'counter';
  const recordId = props.match.params.id;
  const { history } = useReactRouter();
  const formikRef = useRef(null);
  const fetchQuery = useQuery(CounterQueryType, { variables: { _id: recordId } });
  const [saveMutation, { loading: isSaving, error: savingError }] = useMutation(SaveCounterMutationType);
  const [deleteMutation, { loading: isDeleting, error: deletingError }] = useMutation(DeleteCounterMutationType);

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
      deleteMutation({ variables: { _ids: [recordId] }, refetchQueries: () => [{ query: CountersQueryType }] });
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
          await saveMutation({ variables: { data: mapToApi(values) }, refetchQueries: () => [{ query: CountersQueryType }] });
          setSubmitting(false);
          history.push(`/${entityName}`);
        }}
        component={Form}
      />
    </Spin>
  );
};

export default DeviceCost;
