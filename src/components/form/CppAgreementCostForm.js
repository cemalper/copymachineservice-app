import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import * as yup from 'yup';
import { MoneyInput, OptionInput, DateInput, NumberInput, TextInput, CppAgreementLookupInput } from '../input';
import { deviceCostTypePair } from 'common/enums';

const CppAgreementCostForm = props => {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit} layout="horizontal">
      <CppAgreementLookupInput name="cppAgreementId" label="Antlaşma" {...props} required />
      <OptionInput name="deviceCostType" label="Masraf Tipi" {...props} required>
        {deviceCostTypePair.map(deviceCostType => (
          <OptionInput.Option key={deviceCostType.value} value={deviceCostType.value} text={deviceCostType.text} />
        ))}
      </OptionInput>
      <TextInput name="name" label="Ad" {...props} required />
      <MoneyInput name="unitPrice" label="Birim Ücreti" {...props} required />
      <NumberInput name="amount" label="Adet" {...props} required />
      <MoneyInput name="totalPrice" label="Toplam Ücret" {...props} disabled />
      <DateInput name="date" label="Tarih" {...props} required />
      <TextInput name="comment" label="Açıklama" {...props} />
      <DateInput name="createdOn" label="Kayıt Tarihi" {...props} defaultValue={props.initialValues.createdOn || moment()} disabled />
    </Form>
  );
};

CppAgreementCostForm.initialValues = {
  cppAgreementId: undefined,
  deviceCostType: undefined,
  name: undefined,
  unitPrice: undefined,
  amount: undefined,
  totalPrice: undefined,
  date: undefined,
  comment: undefined
};

CppAgreementCostForm.validationSchema = yup.object().shape({
  cppAgreementId: yup.string().required('Antlaşma boş olamaz'),
  deviceCostType: yup.string().required('Masraf tipi boş olamaz'),
  name: yup.string().required('Ad boş olamaz'),
  unitPrice: yup
    .object()
    .shape({
      price: yup
        .string()
        .nullable()
        .required('Tutar boş olamaz'),
      currency: yup.string().required('Para birimi boş olamaz')
    })
    .required('Birim Fiyat boş olamaz'),
  amount: yup.object().required('Adet boş olamaz'),
  date: yup.string().required('Tarih boş olamaz')
});

export default CppAgreementCostForm;
