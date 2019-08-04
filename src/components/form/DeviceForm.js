import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { TextInput, OptionInput, DateInput, CustomerLookupInput } from '../input';
import { brandNamesPair, deviceColourTypePair, deviceTypePair } from 'common/enums';

const CustomerForm = props => {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit} layout="horizontal">
      <CustomerLookupInput name="customerId" label="Müşteri" {...props} />
      <TextInput name="code" label="Cihaz Kodu" isRequired {...props} />
      <TextInput name="serialNumber" label="Seri Numarası" {...props} />
      <OptionInput name="brandName" label="Cihaz Modeli" {...props}>
        {brandNamesPair.map(brandName => (
          <OptionInput.Option key={brandName.value} value={brandName.value} text={brandName.text} />
        ))}
      </OptionInput>
      <TextInput name="model" label="Model" {...props} />
      <OptionInput name="deviceType" label="Cihaz Tipi" {...props}>
        {deviceTypePair.map(deviceType => (
          <OptionInput.Option key={deviceType.value} value={deviceType.value} text={deviceType.text} />
        ))}
      </OptionInput>
      <OptionInput name="colourType" label="Renk" {...props}>
        {deviceColourTypePair.map(colourType => (
          <OptionInput.Option key={colourType.value} value={colourType.value} text={colourType.text} />
        ))}
      </OptionInput>

      <DateInput name="createdOn" label="Kayıt Tarihi" {...props} defaultValue={props.initialValues.createdOn || moment()} disabled />
    </Form>
  );
};

export default CustomerForm;
