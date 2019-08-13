import React from 'react';
import { Form } from 'antd';
import { TextInput, DateInput } from '../input';
import moment from 'moment';
import * as yup from 'yup';

const CustomerForm = props => {
  console.log(props.values);
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit} layout="horizontal">
      <TextInput name="code" label="Müşteri Kodu" {...props} required />
      <TextInput name="title" label="Müşteri Ünvanı" {...props} required />
      <TextInput name="address" label="Adres" {...props} />
      <TextInput name="postalCode" label="Posta Kodu" {...props} />
      <TextInput name="province" label="İl" {...props} />
      <TextInput name="district" label="İlçe" {...props} />
      <TextInput name="provinceCode" label="İl Kodu" {...props} />
      <TextInput name="officePhone" label="Tel" {...props} />
      <TextInput name="officePhone2" label="Tel 2" {...props} />
      <TextInput name="faxPhone" label="Fax" {...props} />
      <TextInput name="taxoffice" label="Vergi Dairesi" {...props} />
      <TextInput name="taxNo" label="Vergi No" {...props} />
      <TextInput name="mail" label="E Mail" {...props} />
      <DateInput name="createdOn" label="Kayıt Tarihi" {...props} defaultValue={props.initialValues.createdOn || moment()} disabled />
    </Form>
  );
};

CustomerForm.initialValues = {
  _id: undefined,
  code: undefined,
  title: undefined,
  address: undefined,
  postalCode: undefined,
  province: undefined,
  provinceCode: undefined,
  district: undefined,
  officePhone: undefined,
  officePhone2: undefined,
  taxOffice: undefined,
  taxNo: undefined
};

CustomerForm.validationSchema = yup.object().shape({
  code: yup.string().required('Müşteri Kodu boş olamaz'),
  title: yup.string().required('Müşteri ünvanı boş olamaz')
});

export default CustomerForm;
