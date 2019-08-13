import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import * as yup from 'yup';
import { DateInput, DeviceLookupInput, NumberInput } from '../input';
const CounterForm = props => {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit} layout="horizontal">
      <DeviceLookupInput name="deviceId" label="Cihaz" {...props} />
      <DateInput name="date" label="Tarih" {...props} />
      <NumberInput name="blackA5" label="Siyah A5" {...props} />
      <NumberInput name="blackA4" label="Siyah A4" {...props} />
      <NumberInput name="blackA3" label="Siyah A3" {...props} />
      <NumberInput name="colourA5" label="Renkli A5" {...props} />
      <NumberInput name="colourA4" label="Renkli A4" {...props} />
      <NumberInput name="colourA3" label="Renkli A3" {...props} />
      <DateInput name="createdOn" label="Kayıt Tarihi" {...props} defaultValue={props.initialValues.createdOn || moment()} disabled />
    </Form>
  );
};

CounterForm.initialValues = {
  deviceId: undefined,
  date: undefined,
  blackA5: undefined,
  blackA4: undefined,
  blackA3: undefined,
  colourA5: undefined,
  colourA4: undefined,
  colourA3: undefined
};

CounterForm.validationSchema = yup.object().shape({
  deviceId: yup.string().required('Cihaz boş olamaz'),
  date: yup.string().required('Tarih boş olamaz')
});

export default CounterForm;
