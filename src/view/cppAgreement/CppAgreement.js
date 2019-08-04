import React, { useRef } from 'react';
import useReactRouter from 'use-react-router';
import { Spin, Alert } from 'antd';
import { Formik } from 'formik';
import { useQuery, useMutation } from 'react-apollo-hooks';
import {
  CppAgreementQueryType,
  CppAgreementsQueryType,
  SaveCppAgreementMutationType,
  DeleteCppAgreementMutationType
} from '../../graphql/cppAgreement-graphql';
import FormRibbon from '../../components/ribbons/FormRibbon';
import Form from '../../components/form/CppAgreementForm';

const mapToApi = values => ({
  _id: values._id,
  code: values.code,
  incrementRate: values.incrementRate,
  startDate: values.startDate,
  finishDate: values.finishDate,
  status: values.status,
  customerId: values.customerId
});

const Customer = props => {
  const entityName = 'agreement/cpp';
  const recordId = props.match.params.id;
  const { history } = useReactRouter();
  const formikRef = useRef(null);
  const fetchQuery = useQuery(CppAgreementQueryType, { variables: { _id: recordId } });
  const [saveMutation, { loading: isSaving, error: savingError }] = useMutation(SaveCppAgreementMutationType);
  const [deleteMutation, { loading: isDeleting, error: deletingError }] = useMutation(DeleteCppAgreementMutationType);

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
      deleteMutation({ variables: { _ids: [recordId] }, refetchQueries: () => [{ query: CppAgreementsQueryType }] });
      history.push(`/${entityName}`);
    },
    loading: isDeleting,
    visible: !!recordId,
    disabled: isDeleting
  };
  console.log(fetchQuery.data);
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
          await saveMutation({ variables: { data: mapToApi(values) }, refetchQueries: () => [{ query: CppAgreementsQueryType }] });
          setSubmitting(false);
          history.push(`/${entityName}`);
        }}
        component={Form}
      />
    </Spin>
  );
};

export default Customer;
