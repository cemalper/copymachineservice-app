import React, { useRef } from 'react';
import useReactRouter from 'use-react-router';
import { Spin, Alert } from 'antd';
import { Formik } from 'formik';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { CounterQueryType, CountersQueryType, SaveCounterMutationType, DeleteCounterMutationType } from '../../../graphql/counter-graphql';
import FormRibbon from '../../../components/ribbons/FormRibbon';
import Form from '../../../components/form/CounterForm';
import useMergedInitialValues from '../../../hook/useMergedInitialValues';

const mapToApi = values => ({
  _id: values._id,
  deviceId: values.deviceId,
  colour: {
    A5: values.colourA5,
    A4: values.colourA4,
    A3: values.colourA3
  },
  black: {
    A5: values.blackA5,
    A4: values.blackA4,
    A3: values.blackA3
  },
  date: values.date
});

const apiToForm = values => ({
  _id: values._id,
  deviceId: values.deviceId,
  colourA5: values.colour.A5,
  colourA4: values.colour.A4,
  colourA3: values.colour.A3,
  blackA5: values.black.A5,
  blackA4: values.black.A4,
  blackA3: values.black.A3,
  date: values.date
});

const DeviceCost = props => {
  const entityName = 'counter';
  const recordId = props.match.params.id;
  const initialValues = useMergedInitialValues(Form.initialValues, props.location.search);
  const { history } = useReactRouter();
  const formikRef = useRef(null);
  const fetchQuery = useQuery(CounterQueryType, { variables: { _id: recordId }, fetchPolicy: 'cache-and-network' });
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
        validationSchema={Form.validationSchema}
        initialValues={(fetchQuery.data && apiToForm(fetchQuery.data[Object.keys(fetchQuery.data)])) || initialValues}
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
