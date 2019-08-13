import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { MoneyInput, OptionInput, DateInput, DeviceLookupInput, NumberInput, TextInput } from '../input';
import { deviceCostTypePair } from 'common/enums';
import * as yup from 'yup';

const DeviceCostForm = props => {
  const { handleSubmit, values, setFieldValue } = props;
  console.log(props);
  return (
    <Form onSubmit={handleSubmit} layout="horizontal">
      <DeviceLookupInput name="deviceId" label="Cihaz" {...props} required />
      <OptionInput name="deviceCostType" label="Masraf Tipi" {...props} required>
        {deviceCostTypePair.map(deviceCostType => (
          <OptionInput.Option key={deviceCostType.value} value={deviceCostType.value} text={deviceCostType.text} />
        ))}
      </OptionInput>
      <TextInput name="name" label="Ad" {...props} required />
      <MoneyInput
        name="unitPrice"
        label="Birim Ücreti"
        {...props}
        customChange={value => {
          if (!values.unitPrice) return;
          const totalPrice = value.price * values.amount;
          if (!totalPrice) return;
          setFieldValue('totalPrice', { price: totalPrice, currency: value.currency });
        }}
        required
      />
      <NumberInput
        name="amount"
        label="Adet"
        {...props}
        customChange={value => {
          if (!values.unitPrice) return;
          const totalPrice = value * values.unitPrice.price;
          if (!totalPrice) return;
          setFieldValue('totalPrice', { price: totalPrice, currency: values.unitPrice.currency });
        }}
        required
      />
      <MoneyInput name="totalPrice" label="Toplam Ücret" {...props} disabled />
      <DateInput name="date" label="Tarih" {...props} />
      <TextInput name="comment" label="Açıklama" {...props} />
      <DateInput name="createdOn" label="Kayıt Tarihi" {...props} defaultValue={props.initialValues.createdOn || moment()} disabled />
    </Form>
  );
};

DeviceCostForm.initialValues = {
  deviceId: undefined,
  deviceCostType: undefined,
  name: undefined,
  unitPrice: undefined,
  amount: undefined,
  totalPrice: undefined,
  date: undefined,
  comment: undefined
};

DeviceCostForm.validationSchema = yup.object().shape({
  deviceId: yup.string().required('Cihaz boş olamaz'),
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

export default DeviceCostForm;
