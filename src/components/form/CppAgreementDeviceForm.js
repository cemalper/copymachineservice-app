import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
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
      <CppAgreementLookupInput name="cppAgreementId" label="Antlaşma" {...props} />
      <DeviceLookupInput name="deviceId" label="Cihaz" {...props} />
      <OptionInput name="cppDeviceType" label="Cihaz Kiralama Tipi" {...props} defaultValue={props.initialValues.cppDeviceType || 'Rent'}>
        {cppAgreementDeviceTypePair.map(cppAgreementDevice => (
          <OptionInput.Option key={cppAgreementDevice.value} value={cppAgreementDevice.value} text={cppAgreementDevice.text} />
        ))}
      </OptionInput>
      <MoneyInput name="machineRentPrice" label="Kiralama Ücreti" {...props} />
      <MoneyInput name="blackUnitPrice" label="Siyah Kopya Birim Ücreti" {...props} />
      <MoneyInput name="colourUnitPrice" label="Renkli Kopya Birim Ücreti" {...props} />
      <NumberInput name="minimumCopyLimit" label="Minimum Kopya Adeti" {...props} />
      <MoneyInput name="cost" label="Maliyet" {...props} />
      <DateInput name="createdOn" label="Kayıt Tarihi" {...props} defaultValue={props.initialValues.createdOn || moment()} disabled />
    </Form>
  );
};

export default CppAgreementDeviceForm;
