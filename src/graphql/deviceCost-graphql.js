import { gql } from 'apollo-boost';

export const DeviceCostsQueryType = gql`
  {
    deviceCosts {
      _id
      deviceId
      cppAgreementId
      deviceCostType
      name
      amount
      unitPrice {
        price
        currency
      }
      totalPrice {
        price
        currency
      }
      date
      createdOn
      comment
      device {
        _id
        code
        serialNumber
        brandName
        model
      }
    }
  }
`;

export const CppAgreementCostsQueryType = gql`
  {
    deviceCosts {
      _id
      deviceId
      cppAgreementId
      deviceCostType
      name
      amount
      unitPrice {
        price
        currency
      }
      totalPrice {
        price
        currency
      }
      date
      createdOn
      comment
      device {
        _id
        code
        serialNumber
        brandName
        model
      }
      cppAgreement {
        _id
        code
        customer {
          _id
          code
          title
        }
      }
    }
  }
`;

export const DeviceCostQueryType = gql`
  query DeviceCost($_id: ID) {
    deviceCost(_id: $_id) {
      _id
      deviceId
      cppAgreementId
      deviceCostType
      name
      amount
      unitPrice {
        price
        currency
      }
      totalPrice {
        price
        currency
      }
      date
      createdOn
      comment
    }
  }
`;

export const SaveDeviceCostMutationType = gql`
  mutation SaveCostDevice($data: DeviceCostInput) {
    saveCostDevice(data: $data) {
      _id
    }
  }
`;

export const DeleteDeviceCostMutationType = gql`
  mutation DeleteCostDevice($_ids: [ID]) {
    deleteCostDevice(_ids: $_ids)
  }
`;
