import React from 'react';
import { Form } from 'antd';
import { TextInput } from '../input';

const CustomerForm = props => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit} layout="horizontal">
      <TextInput name="code" label="Müşteri Kodu" isRequired {...props} />
      <TextInput name="title" label="Müşteri Ünvanı" {...props} />
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
    </Form>
  );
};

export default CustomerForm;
