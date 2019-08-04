import { gql } from 'apollo-boost';

export const CustomersQueryType = gql`
  {
    customers {
      _id
      code
      title
      address
      postalCode
      province
      provinceCode
      district
      officePhone
      officePhone2
      taxOffice
      taxNo
    }
  }
`;
export const CustomerLookupQueryType = gql`
  {
    customers {
      _id
      code
      title
    }
  }
`;
export const CustomerQueryType = gql`
  query Customer($_id: ID) {
    customer(_id: $_id) {
      _id
      code
      title
      address
      postalCode
      province
      provinceCode
      district
      officePhone
      officePhone2
      taxOffice
      taxNo
    }
  }
`;

export const SaveCustomerMutationType = gql`
  mutation SaveCustomer($data: CustomerInput) {
    saveCustomer(data: $data) {
      _id
    }
  }
`;

export const DeleteCustomerMutationType = gql`
  mutation DeleteCustomer($_ids: [ID]) {
    deleteCustomer(_ids: $_ids)
  }
`;
