import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import * as yup from 'yup';
import { MoneyInput, OptionInput, DateInput, DeviceLookupInput, CppAgreementLookupInput, NumberInput } from '../input';
import { cppAgreementDeviceTypePair } from 'common/enums';

/*   
  _id: ID
  deviceId: ID
  cppDeviceType: CppAgreementDeviceType
  machineRentPrice: MoneyType
  copyUnitPrice: CopyUnitPrice
  minimumCopyLimit: Int
  cost: MoneyType
*/

const CppAgreementDeviceForm = props => {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit} layout="horizontal">
      <CppAgreementLookupInput name="cppAgreementId" label="Antlaşma" {...props} required />
      <DeviceLookupInput name="deviceId" label="Cihaz" {...props} required />
      <OptionInput name="cppDeviceType" label="Cihaz Kiralama Tipi" {...props} defaultValue={props.initialValues.cppDeviceType || 'Rent'} required>
        {cppAgreementDeviceTypePair.map(cppAgreementDevice => (
          <OptionInput.Option key={cppAgreementDevice.value} value={cppAgreementDevice.value} text={cppAgreementDevice.text} />
        ))}
      </OptionInput>
      <MoneyInput name="machineRentPrice" label="Kiralama Ücreti" {...props} required />
      <MoneyInput name="blackUnitPrice" label="Siyah Kopya Birim Ücreti" {...props} />
      <MoneyInput name="colourUnitPrice" label="Renkli Kopya Birim Ücreti" {...props} />
      <NumberInput name="minimumCopyLimit" label="Minimum Kopya Adeti" {...props} required />
      <MoneyInput name="cost" label="Maliyet" {...props} required />
      <DateInput name="createdOn" label="Kayıt Tarihi" {...props} defaultValue={props.initialValues.createdOn || moment()} disabled />
    </Form>
  );
};

CppAgreementDeviceForm.initialValues = {
  cppAgreementId: undefined,
  deviceId: undefined,
  cppDeviceType: undefined,
  machineRentPrice: undefined,
  blackUnitPrice: undefined,
  colourUnitPrice: undefined,
  minimumCopyLimit: undefined,
  cost: undefined
};

CppAgreementDeviceForm.validationSchema = yup.object().shape({
  cppAgreementId: yup.string().required('Antlaşma boş olamaz'),
  deviceId: yup.string().required('Cihaz boş olamaz'),
  cppDeviceType: yup.string().required('Cihaz kiralama tipi boş olamaz'),
  machineRentPrice: yup
    .object()
    .shape({
      price: yup
        .string()
        .nullable()
        .required('Tutar boş olamaz'),
      currency: yup.string().required('Para birimi boş olamaz')
    })
    .required('Cihaz Kiralama ücreti boş olamaz'),
  minimumCopyLimit: yup.number().required('Minimum kopya adeti boş olamaz'),
  cost: yup
    .object()
    .shape({
      price: yup
        .string()
        .nullable()
        .required('Tutar boş olamaz'),
      currency: yup.string().required('Para birimi boş olamaz')
    })
    .required('Tutar boş olamaz')
});

export default CppAgreementDeviceForm;
