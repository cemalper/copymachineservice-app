import { gql } from 'apollo-boost';

export const CountersQueryType = gql`
  {
    counters {
      _id
      deviceId
      colour {
        A5
        A4
        A3
      }
      black {
        A5
        A4
        A3
      }
      date
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

export const CounterQueryType = gql`
  query Counter($_id: ID) {
    counter(_id: $_id) {
      _id
      deviceId
      colour {
        A5
        A4
        A3
      }
      black {
        A5
        A4
        A3
      }
      date
      device {
        _id
        serialNumber
        brandName
        model
      }
    }
  }
`;

export const SaveCounterMutationType = gql`
  mutation SaveCounter($data: CounterInput) {
    saveCounter(data: $data) {
      _id
    }
  }
`;

export const DeleteCounterMutationType = gql`
  mutation DeleteCounter($_ids: [ID]) {
    deleteCounter(_ids: $_ids)
  }
`;
