import React, { useState, useEffect } from 'react';
import { CppAgreementsQueryType, DeleteCppAgreementMutationType } from '../../graphql/cppAgreement-graphql';
import { cppAgreementStatusTypePair } from 'common/enums';
import { useQuery, useMutation } from 'react-apollo-hooks';
import Table from '../../components/table/Table';

import TableRibbons from '../../components/ribbons/TableRibbon';
import ShowErrorNotification from '../../components/showErrorNotification/ShowErrorNotification';

const entityName = 'agreement/cpp/cppagreement';
const columns = [
  {
    title: 'Kod',
    dataIndex: 'code',
    sorter: true
  },
  {
    title: 'Müşteri',
    dataIndex: 'customerTitle',
    render: (text, record) => (
      <a href={`/customer/${record.customer._id}`}>
        {record.customer.code} - {record.customer.title}
      </a>
    )
  },
  {
    title: 'Başlangıç Tarihi',
    dataIndex: 'startDate',
    sorter: true
  },

  {
    title: 'Bitiş Tarihi',
    dataIndex: 'endDate',
    sorter: true
  },
  {
    title: 'Yıllık Artış',
    dataIndex: 'incrementRate'
  },
  {
    title: 'Durum',
    dataIndex: 'status',
    filters: cppAgreementStatusTypePair,
    render: (text, record, index) => (text && cppAgreementStatusTypePair.find(x => x.value === text).text) || ''
  }
];

const CppAgreementList = props => {
  const fetchQuery = useQuery(CppAgreementsQueryType);
  const [filteredColumns, setFilteredColumns] = useState(columns);
  const [deleteRecords, { loading: isDeleting, error: deleteError }] = useMutation(DeleteCppAgreementMutationType);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  useEffect(() => {
    var data = fetchQuery.data && fetchQuery.data[Object.keys(fetchQuery.data)];
    if (!data) return;
    var customerNameColumn = columns.find(x => x.dataIndex === 'customerTitle');
    customerNameColumn.filters = data.map(x => ({ text: `${x.customer.code} - ${x.customer.title}`, value: x.customer.code }));
    customerNameColumn.onFilter = (value, record) => record.customer.code === value;
    setFilteredColumns(columns);
  }, [fetchQuery]);

  const onItemClick = record => {
    props.history.push(`/${entityName}/${record._id}`);
  };

  const onNewRibbonButton = {
    onClick: () => {
      props.history.push(`/${entityName}/new`);
    }
  };

  const onReloadRibbonButton = {
    onClick: async () => {
      await fetchQuery.refetch();
    },
    disabled: fetchQuery.loading,
    loading: fetchQuery.loading
  };

  const onDeleteRibbonButton = {
    onClick: async () => {
      await deleteRecords({ variables: { _ids: selectedItemIds }, refetchQueries: () => [{ query: CppAgreementsQueryType }] });
      setSelectedItemIds([]);
    },
    disabled: selectedItemIds.length === 0,
    loading: isDeleting
  };
  if (fetchQuery.error) {
    return (
      <ShowErrorNotification
        isLoading={fetchQuery.loading}
        message={`${fetchQuery.error.message}`}
        retryAction={async () => {
          await fetchQuery.refetch();
        }}
      />
    );
  }
  if (deleteError)
    return (
      <ShowErrorNotification
        isLoading={isDeleting}
        message={deleteError.message}
        retryAction={async () => {
          await deleteRecords({ variables: { _ids: selectedItemIds }, refetchQueries: () => [{ query: CppAgreementsQueryType }] });
        }}
      />
    );
  return (
    <div>
      <TableRibbons onNewButton={onNewRibbonButton} onReloadButton={onReloadRibbonButton} onDeleteButton={onDeleteRibbonButton} />
      <Table
        columns={filteredColumns}
        onItemClick={onItemClick}
        onSelectChange={setSelectedItemIds}
        loading={fetchQuery.loading}
        dataSource={fetchQuery.data && fetchQuery.data[Object.keys(fetchQuery.data)]}
      />
    </div>
  );
};
export default CppAgreementList;
