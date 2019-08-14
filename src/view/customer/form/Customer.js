import React, { useRef } from 'react';
import { Spin, Alert } from 'antd';
import { Formik } from 'formik';
import useReactRouter from 'use-react-router';
import { useQuery, useMutation } from 'react-apollo-hooks';

import { CustomerQueryType, CustomersQueryType, SaveCustomerMutationType, DeleteCustomerMutationType } from '../../../graphql/customer-graphql';
import FormRibbon from '../../../components/ribbons/FormRibbon';
import CustomerForm from '../../../components/form/CustomerForm';

const mapToApi = values => ({
  _id: values._id,
  code: values.code,
  title: values.title,
  address: values.address,
  postalCode: values.postalCode,
  province: values.province,
  provinceCode: values.provinceCode,
  district: values.district,
  officePhone: values.officePhone,
  officePhone2: values.officePhone2,
  taxOffice: values.taxOffice,
  taxNo: values.taxNo
});

const Customer = props => {
  const entityName = 'customer';
  const recordId = props.match.params.id;
  const { history } = useReactRouter();
  const formikRef = useRef(null);
  const fetchQuery = useQuery(CustomerQueryType, { variables: { _id: recordId }, fetchPolicy: 'cache-and-network' });
  const [saveMutation, { loading: isSaving, error: savingError }] = useMutation(SaveCustomerMutationType);
  const [deleteMutation, { loading: isDeleting, error: deletingError }] = useMutation(DeleteCustomerMutationType);

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
      deleteMutation({ variables: { _ids: [recordId] }, refetchQueries: () => [{ query: CustomersQueryType }] });
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
        validationSchema={CustomerForm.validationSchema}
        initialValues={(fetchQuery.data && fetchQuery.data[Object.keys(fetchQuery.data)]) || CustomerForm.initialValues}
        isInitialValid={false}
        onSubmit={async (values, { setSubmitting }) => {
          await saveMutation({ variables: { data: mapToApi(values) }, refetchQueries: () => [{ query: CustomersQueryType }] });
          setSubmitting(false);
          history.push(`/${entityName}`);
        }}
        component={CustomerForm}
      />
    </Spin>
  );
};

export default Customer;
