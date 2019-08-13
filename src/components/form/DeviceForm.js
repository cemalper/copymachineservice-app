import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import * as yup from 'yup';
import { TextInput, OptionInput, DateInput, CustomerLookupInput } from '../input';
import { brandNamesPair, deviceColourTypePair, deviceTypePair } from 'common/enums';

const DeviceForm = props => {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit} layout="horizontal">
      <CustomerLookupInput name="customerId" label="Müşteri" {...props} />
      <TextInput name="code" label="Cihaz Kodu" {...props} required />
      <TextInput name="serialNumber" label="Seri Numarası" {...props} required />
      <OptionInput name="brandName" label="Cihaz Modeli" {...props} required>
        {brandNamesPair.map(brandName => (
          <OptionInput.Option key={brandName.value} value={brandName.value} text={brandName.text} />
        ))}
      </OptionInput>
      <TextInput name="model" label="Model" {...props} required />
      <OptionInput name="deviceType" label="Cihaz Tipi" {...props} required>
        {deviceTypePair.map(deviceType => (
          <OptionInput.Option key={deviceType.value} value={deviceType.value} text={deviceType.text} />
        ))}
      </OptionInput>
      <OptionInput name="colourType" label="Renk" {...props} required>
        {deviceColourTypePair.map(colourType => (
          <OptionInput.Option key={colourType.value} value={colourType.value} text={colourType.text} />
        ))}
      </OptionInput>

      <DateInput name="createdOn" label="Kayıt Tarihi" {...props} defaultValue={props.initialValues.createdOn || moment()} disabled />
    </Form>
  );
};

DeviceForm.initialValues = {
  _id: undefined,
  code: undefined,
  brandName: undefined,
  model: undefined,
  serialNumber: undefined,
  colourType: undefined,
  deviceType: undefined,
  customerId: undefined
};

DeviceForm.validationSchema = yup.object().shape({
  code: yup.string().required('Cihaz Kodu boş olamaz'),
  serialNumber: yup.string().required('Seri Numarası boş olamaz'),
  brandName: yup.string().required('Marka boş olamaz'),
  model: yup.string().required('Model boş olamaz'),
  deviceType: yup.string().required('Cihaz Tipi boş olamaz'),
  colourType: yup.string().required('Renk Tipi boş olamaz')
});

export default DeviceForm;
