import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';

import Table from '../../../components/table/Table';
import TableRibbons from '../../../components/ribbons/TableRibbon';
import ShowErrorNotification from '../../../components/showErrorNotification/ShowErrorNotification';
import { buildDeviceName } from '../../../utils/buildName';
import { CountersQueryType, DeleteCounterMutationType } from '../../../graphql/counter-graphql';
const entityName = 'counter';
const columns = [
  {
    title: 'Cihaz',
    dataIndex: 'device',
    render: (text, record) => <a href={`/device/${record.device._id}`}>{buildDeviceName(record.device)}</a>,
    sorter: true
  },
  {
    title: 'Siyah',
    children: [
      {
        title: 'A5',
        dataIndex: 'black.A5'
      },
      {
        title: 'A4',
        dataIndex: 'black.A4'
      },
      {
        title: 'A3',
        dataIndex: 'black.A3'
      }
    ]
  },
  {
    title: 'Renkli',
    children: [
      {
        title: 'A5',
        dataIndex: 'colour.A5'
      },
      {
        title: 'A4',
        dataIndex: 'colour.A4'
      },
      {
        title: 'A3',
        dataIndex: 'colour.A3'
      }
    ]
  },
  {
    title: 'Tarih',
    dataIndex: 'date'
  }
];

const CounterList = props => {
  const fetchQuery = useQuery(CountersQueryType);
  const [filteredColumns, setFilteredColumns] = useState(columns);
  const [deleteRecords, { loading: isDeleting, error: deleteError }] = useMutation(DeleteCounterMutationType);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  useEffect(() => {
    let data = fetchQuery.data && fetchQuery.data[Object.keys(fetchQuery.data)];
    if (!data) return;
    let deviceNameColumn = columns.find(x => x.dataIndex === 'device');
    deviceNameColumn.filters = data.map(x => ({ text: buildDeviceName(x.device), value: x.device.code }));
    deviceNameColumn.onFilter = (value, record) => record.device.code === value;
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
      await deleteRecords({ variables: { _ids: selectedItemIds }, refetchQueries: () => [{ query: CountersQueryType }] });
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
          await deleteRecords({ variables: { _ids: selectedItemIds }, refetchQueries: () => [{ query: CountersQueryType }] });
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
export default CounterList;
