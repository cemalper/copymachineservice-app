import React, { useState, useEffect } from 'react';
import { CppAgreementDevicesQueryType, DeleteCppAgreementDeviceMutationType } from '../../graphql/cppAgreementDevice-graphql';
import { cppAgreementDeviceTypePair } from 'common/enums';
import { useQuery, useMutation } from 'react-apollo-hooks';
import Table from '../../components/table/Table';

import TableRibbons from '../../components/ribbons/TableRibbon';
import ShowErrorNotification from '../../components/showErrorNotification/ShowErrorNotification';
import { buildDeviceName, buildCustomerName, buildMoneyName } from '../../utils/buildName';
const entityName = 'agreement/cpp/cppagreementdevice';
const columns = [
  {
    title: 'Antlaşma',
    dataIndex: 'agreement',
    sorter: true,
    render: (text, record) => <a href={`/agreement/cpp/${record.device._id}`}>{record.agreement.code}</a>
  },
  {
    title: 'Cihaz',
    dataIndex: 'device',
    sorter: true,
    render: (text, record) => <a href={`/device/${record.device._id}`}>{buildDeviceName(record.device)}</a>
  },
  {
    title: 'Müşteri',
    dataIndex: 'customer',
    render: (text, record) => <a href={`/customer/${record.cppAgreement.customer._id}`}>{buildCustomerName(record.cppAgreement.customer)}</a>
  },
  {
    title: 'Cihaz Kiralama Tipi',
    dataIndex: 'cppDeviceType',
    filters: cppAgreementDeviceTypePair
  },
  {
    title: 'Kiralama Ücreti',
    dataIndex: 'machineRentPrice'
  },
  {
    title: 'Minimum Kopya',
    dataIndex: 'minimumCopyLimit'
  },
  {
    title: 'Siyah Kopya Birim Ücreti',
    dataIndex: 'blackCopyUnitPrice',
    render: (text, record) => record.copyUnitPrice.black && buildMoneyName(record.copyUnitPrice.black)
  },
  {
    title: 'Renkli Kopya Birim Ücreti',
    dataIndex: 'colourCopyUnitPrice',
    render: (text, record) => record.copyUnitPrice.colour && buildMoneyName(record.copyUnitPrice.colour)
  }
];

const CppAgreementDeviceList = props => {
  const fetchQuery = useQuery(CppAgreementDevicesQueryType);
  const [filteredColumns, setFilteredColumns] = useState(columns);
  const [deleteRecords, { loading: isDeleting, error: deleteError }] = useMutation(DeleteCppAgreementDeviceMutationType);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  useEffect(() => {
    var data = fetchQuery.data && fetchQuery.data[Object.keys(fetchQuery.data)];
    if (!data) return;
    var customerNameColumn = columns.find(x => x.dataIndex === 'customer');
    customerNameColumn.filters = data.map(x => ({
      text: buildCustomerName(x.cppAgreement.customer),
      value: x.cppAgreement.customer._id
    }));
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
      await deleteRecords({ variables: { _ids: selectedItemIds }, refetchQueries: () => [{ query: CppAgreementDevicesQueryType }] });
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
          await deleteRecords({ variables: { _ids: selectedItemIds }, refetchQueries: () => [{ query: CppAgreementDevicesQueryType }] });
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
export default CppAgreementDeviceList;
