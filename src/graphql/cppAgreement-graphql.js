import { gql } from 'apollo-boost';

export const CppAgreementsQueryType = gql`
  {
    cppAgreements {
      _id
      code
      customerId
      incrementRate
      startDate
      finishDate
      status
      customer {
        _id
        code
        title
      }
    }
  }
`;
export const CppAgreementLookupQueryType = gql`
  {
    cppAgreements {
      _id
      code
      customer {
        _id
        code
        title
      }
    }
  }
`;
export const CppAgreementQueryType = gql`
  query CppAgreement($_id: ID) {
    cppAgreement(_id: $_id) {
      _id
      code
      customerId
      incrementRate
      startDate
      finishDate
      status
      customer {
        _id
        code
        title
      }
    }
  }
`;

export const SaveCppAgreementMutationType = gql`
  mutation SaveCppAgreement($data: CppAgreementInput) {
    saveCppAgreement(data: $data) {
      _id
    }
  }
`;

export const DeleteCppAgreementMutationType = gql`
  mutation DeleteCppAgreement($_ids: [ID]) {
    deleteCppAgreement(_ids: $_ids)
  }
`;
