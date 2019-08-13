import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { TextInput, OptionInput, DateInput, CustomerLookupInput } from '../input';
import { cppAgreementStatusTypePair } from 'common/enums';
import * as yup from 'yup';

/*      code
      customerId
      incrementRate
      startDate
      finishDate
      status
      */

const CustomerForm = props => {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit} layout="horizontal">
      <CustomerLookupInput name="customerId" label="Müşteri" {...props} required />
      <TextInput name="code" label="Antlaşma Kodu" isRequired {...props} required />
      <DateInput name="startDate" label="Başlangıç Tarihi" {...props} defaultValue={props.initialValues.startDate || moment()} required />
      <DateInput name="finishDate" label="Bitiş Tarihi" {...props} defaultValue={props.initialValues.finishDate || moment()} required />
      <TextInput name="incrementRate" label="Yılık Artış" {...props} required />
      <OptionInput name="status" label="Durum" {...props} defaultValue={props.initialValues.status || 'Active'} required>
        {cppAgreementStatusTypePair.map(cppAgreementStatus => (
          <OptionInput.Option key={cppAgreementStatus.value} value={cppAgreementStatus.value} text={cppAgreementStatus.text} />
        ))}
      </OptionInput>
      <DateInput name="createdOn" label="Kayıt Tarihi" {...props} defaultValue={props.initialValues.createdOn || moment()} disabled />
    </Form>
  );
};

CustomerForm.initialValues = {
  customerId: undefined,
  code: undefined,
  startDate: undefined,
  finishDate: undefined,
  incrementRate: undefined,
  status: undefined
};
CustomerForm.validationSchema = yup.object().shape({
  customerId: yup.string().required('Müşteri alanı boş olamaz'),
  code: yup.string().required('Kod alanı boş olamaz'),
  startDate: yup.string().required('Başlangıç tarihi boş olamaz'),
  finishDate: yup.string().required('Bitiş tarihi boş olamaz'),
  incrementRate: yup
    .number()
    .min(0, '0dan küçük olamaz')
    .required('Yıllık artış alanı boş olamaz'),
  status: yup.string().required('Durum alanı boş olamaz')
});

export default CustomerForm;
