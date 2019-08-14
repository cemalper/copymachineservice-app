import React from 'react';
import Table from '../../table/Table';
import { CustomersQueryType, DeleteCustomerMutationType } from '../../../graphql/customer-graphql';

const columns = [
  {
    title: 'Kod',
    dataIndex: 'code',
    key: 'code',
    sorter: true
    //width: '20%'
  },
  {
    title: 'İsim',
    dataIndex: 'title',
    key: 'title',
    sorter: true
  },
  {
    title: 'İl',
    dataIndex: 'province',
    key: 'province',
    sorter: true
  },
  {
    title: 'İlçe',
    dataIndex: 'district',
    key: 'district',
    sorter: true
  },
  {
    title: 'İş Telefonu',
    dataIndex: 'officePhone',
    key: 'officePhone'
  },
  {
    title: 'Vergi Dairesi',
    dataIndex: 'taxOffice',
    key: 'taxOffice'
  },
  {
    title: 'Vergi Numarası',
    dataIndex: 'taxNo',
    key: 'taxNo'
  }
];
const Customers = props => {
  return (
    <Table
      entityName={'customer'}
      entityDisplayName={'Müşteri'}
      columns={columns}
      fetchQueryType={CustomersQueryType}
      deleteMutationType={DeleteCustomerMutationType}
    />
  );
};

export default Customers;
