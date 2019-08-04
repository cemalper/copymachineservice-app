import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { TextInput, OptionInput, DateInput, CustomerLookupInput } from '../input';
import { cppAgreementStatusTypePair } from 'common/enums';

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
      <CustomerLookupInput name="customerId" label="Müşteri" {...props} />
      <TextInput name="code" label="Antlaşma Kodu" isRequired {...props} />
      <DateInput name="startDate" label="Başlangıç Tarihi" {...props} defaultValue={props.initialValues.startDate || moment()} />
      <DateInput name="finishDate" label="Bitiş Tarihi" {...props} defaultValue={props.initialValues.finishDate || moment()} />
      <TextInput name="incrementRate" label="Yılık Artış" {...props} />
      <OptionInput name="status" label="Durum" {...props} defaultValue={props.initialValues.status || 'Active'}>
        {cppAgreementStatusTypePair.map(cppAgreementStatus => (
          <OptionInput.Option key={cppAgreementStatus.value} value={cppAgreementStatus.value} text={cppAgreementStatus.text} />
        ))}
      </OptionInput>
      <DateInput name="createdOn" label="Kayıt Tarihi" {...props} defaultValue={props.initialValues.createdOn || moment()} disabled />
    </Form>
  );
};

export default CustomerForm;
