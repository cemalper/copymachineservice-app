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
} from '../../../graphql/cppAgreement-graphql';
import FormRibbon from '../../../components/ribbons/FormRibbon';
import Form from '../../../components/form/CppAgreementDeviceForm';

/*   
  copyUnitPrice için formda ve mapperde düzenleme yapılmalı
  _id: ID
  deviceId: ID
  cppDeviceType: CppAgreementDeviceType
  machineRentPrice: MoneyType
  copyUnitPrice: CopyUnitPrice
  minimumCopyLimit: Int
  cost: MoneyType
*/

const mapToApi = values => ({
  _id: values._id,
  deviceId: values.deviceId,
  cppDeviceType: values.cppDeviceType,
  machineRentPrice: {},
  copyUnitPrice: values.copyUnitPrice,
  minimumCopyLimit: values.minimumCopyLimit,
  cost: values.cost
});

const CppAgreementDevice = props => {
  const entityName = 'agreement/cpp/cppagreementdevice';
  const recordId = props.match.params.id;
  const { history } = useReactRouter();
  const formikRef = useRef(null);
  const fetchQuery = useQuery(CppAgreementQueryType, { variables: { _id: recordId }, fetchPolicy: 'cache-and-network' });
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
        validationSchema={Form.validationSchema}
        initialValues={(fetchQuery.data && fetchQuery.data[Object.keys(fetchQuery.data)]) || Form.initialValues}
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

export default CppAgreementDevice;
