import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Spin, Alert } from 'antd';
import { Formik } from 'formik';
import { useQuery, useMutation } from 'react-apollo-hooks';
import FormRibbon from '../ribbons/FormRibbon';
import useReactRouter from 'use-react-router';
import {} from 'common/enums';
const FormContainer = props => {
  const { history } = useReactRouter();
  const formikRef = useRef(null);
  const fetchQuery = useQuery(props.fetchQueryType, { variables: { _id: props.recordId } });
  const [saveMutation, { loading: isSaving, error: savingError }] = useMutation(props.saveMutationType);
  const [deleteMutation, { loading: isDeleting, error: deletingError }] = useMutation(props.deleteMutationType);
  const onNewButton = {
    onClick: () => {
      history.push(`/${props.entityName}/new`);
    },
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
      deleteMutation({ variables: { _ids: [props.recordId] }, refetchQueries: () => [{ query: props.fetchAllQueryType }] });
      history.push(`/${props.entityName}`);
    },
    loading: isDeleting,
    visible: !!props.recordId,
    disabled: isDeleting
  };
  return (
    <Spin spinning={fetchQuery.loading}>
      <FormRibbon onNewButton={onNewButton} onSaveButton={onSaveButton} onDeleteButton={onDeleteButton}>
        {props.custtomRibbon && props.custtomRibbon()}
      </FormRibbon>
      {savingError && <Alert message={`${savingError.message} ${savingError.stack}`} type="error" style={{ marginBottom: 20 }} />}
      {deletingError && <Alert message={`${deletingError.message} ${deletingError.stack}`} type="error" style={{ marginBottom: 20 }} />}
      <Formik
        ref={formikRef}
        enableReinitialize
        initialValues={(fetchQuery.data && fetchQuery.data[Object.keys(fetchQuery.data)]) || {}}
        isInitialValid={false}
        onSubmit={async (values, { setSubmitting }) => {
          debugger;
          await saveMutation({ variables: { data: values }, refetchQueries: () => [{ query: props.fetchAllQueryType }] });
          setSubmitting(false);
          history.push(`/${props.entityName}`);
        }}
      >
        {_props => {
          return props.form({ ..._props });
        }}
      </Formik>
    </Spin>
  );
};

FormContainer.prototype = {
  recordId: PropTypes.string,
  form: PropTypes.func,
  customRibbon: PropTypes.func,
  entityName: PropTypes.string.isRequired,
  fetchQueryType: PropTypes.object.isRequired,
  fetchAllQueryType: PropTypes.object.isRequired,
  saveMutationType: PropTypes.object.isRequired,
  deleteMutationType: PropTypes.object.isRequired
};

export default FormContainer;
