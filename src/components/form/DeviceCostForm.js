import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { MoneyInput, OptionInput, DateInput, DeviceLookupInput, NumberInput, TextInput } from '../input';
import { deviceCostTypePair } from 'common/enums';
const DeviceCostForm = props => {
  const { handleSubmit, values, setFieldValue } = props;
console.log(props);
  return (
    <Form onSubmit={handleSubmit} layout="horizontal">
      <DeviceLookupInput name="deviceId" label="Cihaz" {...props} />
      <OptionInput name="deviceCostType" label="Masraf Tipi" {...props}>
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
      />
      <MoneyInput name="totalPrice" label="Toplam Ücret" {...props} disabled />
      <DateInput name="date" label="Tarih" {...props} />
      <TextInput name="comment" label="Açıklama" {...props} />
      <DateInput name="createdOn" label="Kayıt Tarihi" {...props} defaultValue={props.initialValues.createdOn || moment()} disabled />
    </Form>
  );
};

export default DeviceCostForm;
