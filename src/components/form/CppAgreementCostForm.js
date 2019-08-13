import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { MoneyInput, OptionInput, DateInput, NumberInput, TextInput, CppAgreementLookupInput } from '../input';
import { deviceCostTypePair } from 'common/enums';

const CppAgreementCostForm = props => {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit} layout="horizontal">
      <CppAgreementLookupInput name="cppAgreementId" label="Antlaşma" {...props} />
      <OptionInput name="deviceCostType" label="Masraf Tipi" {...props}>
        {deviceCostTypePair.map(deviceCostType => (
          <OptionInput.Option key={deviceCostType.value} value={deviceCostType.value} text={deviceCostType.text} />
        ))}
      </OptionInput>
      <TextInput name="name" label="Ad" {...props} />
      <MoneyInput name="unitPrice" label="Birim Ücreti" {...props} />
      <NumberInput name="amount" label="Adet" {...props} />
      <MoneyInput name="totalPrice" label="Toplam Ücret" {...props} disabled />
      <DateInput name="date" label="Tarih" {...props} />
      <TextInput name="comment" label="Açıklama" {...props} />
      <DateInput name="createdOn" label="Kayıt Tarihi" {...props} defaultValue={props.initialValues.createdOn || moment()} disabled />
    </Form>
  );
};

export default CppAgreementCostForm;
