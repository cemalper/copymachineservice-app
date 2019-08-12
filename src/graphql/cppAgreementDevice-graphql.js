import { gql } from 'apollo-boost';

export const CppAgreementDevicesQueryType = gql`
  {
    cppAgreementDevices {
      _id
      cppAgreementId
      deviceId
      cppDeviceType
      machineRentPrice {
        price
        currency
      }
      copyUnitPrice {
        colour {
          price
          currency
        }
        black {
          price
          currency
        }
      }
      minimumCopyLimit
      cost {
        price
        currency
      }
      device {
        _id
        serialNumber
        brandName
        model
      }
      cppAgreement {
        _id
        code
      }
    }
  }
`;

export const CppAgreementDeviceLookupQueryType = gql`
  {
    cppAgreementDevices {
      _id
      device {
        _id
        serialNumber
        brand
        model
      }
      cppAgreement {
        _id
        code
      }
    }
  }
`;

export const CppAgreementDeviceQueryType = gql`
  query CppAgreementDevice($_id: ID) {
    cppAgreement(_id: $_id) {
      _id
      cppAgreementId
      deviceId
      cppDeviceType
      machineRentPrice {
        price
        currency
      }
      copyUnitPrice
      minimumCopyLimit
      cost {
        price
        currency
      }
      device {
        _id
        serialNumber
        brandName
        model
      }
      cppAgreement {
        _id
        code
      }
    }
  }
`;

export const SaveCppAgreementDeviceMutationType = gql`
  mutation SaveCppAgreementDevice($data: CppAgreementDeviceInput) {
    saveCppAgreementDevice(data: $data) {
      _id
    }
  }
`;

export const DeleteCppAgreementDeviceMutationType = gql`
  mutation DeleteCppAgreementDevice($_ids: [ID]) {
    deleteCppAgreementDevice(_ids: $_ids)
  }
`;
