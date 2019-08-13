import React, { useState, useEffect } from 'react';
import { DeviceCostsQueryType, DeleteDeviceCostMutationType } from '../../graphql/deviceCost-graphql';
import { deviceCostTypePair } from 'common/enums';
import { useQuery, useMutation } from 'react-apollo-hooks';
import Table from '../../components/table/Table';
import TableRibbons from '../../components/ribbons/TableRibbon';
import ShowErrorNotification from '../../components/showErrorNotification/ShowErrorNotification';
import { buildDeviceName, buildMoneyName, buildCppAgreementName } from '../../utils/buildName';

const entityName = 'agreement/cpp/cppagreementcost';
const columns = [
  {
    title: 'Antlaşma',
    dataIndex: 'cppAgreement',
    render: (text, record) => (
      <a href={`/agreement/cpp/cppagreement/${record.cppAgreement._id}`}>
        {buildCppAgreementName(record.cppAgreement.code, record.cppAgreement.customer.title)}
      </a>
    ),
    sorter: true
  },
  {
    title: 'Cihaz',
    dataIndex: 'device',
    render: (text, record) => <a href={`/device/${record.device._id}`}>{buildDeviceName(record.device)}</a>,
    sorter: true
  },
  {
    title: 'Masraf Tipi',
    dataIndex: 'deviceCostType',
    render: (text, record) => (text && deviceCostTypePair.find(x => x.value === text).text) || ''
  },
  {
    title: 'Ad',
    dataIndex: 'name'
  },
  {
    title: 'Birim Fiyat',
    dataIndex: 'unitPrice',
    render: (text, record) => text && buildMoneyName(record.unitPrice)
  },
  {
    title: 'Toplam Tutar',
    dataIndex: 'totalPrice',
    render: (text, record) => text && buildMoneyName(record.totalPrice)
  },
  {
    title: 'Tarih',
    dataIndex: 'date'
  }
];

const CppAgreementList = props => {
  const fetchQuery = useQuery(DeviceCostsQueryType);
  const [filteredColumns, setFilteredColumns] = useState(columns);
  const [deleteRecords, { loading: isDeleting, error: deleteError }] = useMutation(DeleteDeviceCostMutationType);
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
      await deleteRecords({ variables: { _ids: selectedItemIds }, refetchQueries: () => [{ query: DeviceCostsQueryType }] });
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
          await deleteRecords({ variables: { _ids: selectedItemIds }, refetchQueries: () => [{ query: DeviceCostsQueryType }] });
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
