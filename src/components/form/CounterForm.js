import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { DateInput, DeviceLookupInput, NumberInput } from '../input';
const DeviceCostForm = props => {
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

export default DeviceCostForm;
