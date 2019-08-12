import { gql } from 'apollo-boost';

export const DevicesQueryType = gql`
  {
    devices {
      _id
      code
      brandName
      model
      serialNumber
      colourType
      deviceType
      customer {
        _id
        code
        title
      }
    }
  }
`;

export const DeviceLookupQueryType = gql`
  {
    devices {
      _id
      code
      brandName
      model
      serialNumber
    }
  }
`;

export const DeviceQueryType = gql`
  query Device($_id: ID) {
    device(_id: $_id) {
      _id
      code
      brandName
      model
      serialNumber
      colourType
      deviceType
      customerId
    }
  }
`;

export const SaveDeviceMutationType = gql`
  mutation SaveDevice($data: DeviceInput) {
    saveDevice(data: $data) {
      _id
    }
  }
`;

export const DeleteDeviceMutationType = gql`
  mutation DeleteDevice($_ids: [ID]) {
    deleteDevice(_ids: $_ids)
  }
`;
