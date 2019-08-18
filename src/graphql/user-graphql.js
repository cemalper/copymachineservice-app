import { gql } from 'apollo-boost';

export const UserQueryType = gql`
  query User($_id: ID) {
    user(_id: $_id) {
      _id
      email
    }
  }
`;

export const singupMutationType = gql`
  mutation SingUp($data: UserInput) {
    singup(data: $data) {
      token
    }
  }
`;

export const loginMutationType = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      userName
      email
      token
    }
  }
`;
