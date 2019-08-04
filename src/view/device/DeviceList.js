import React, { useState, useEffect } from 'react';
import { DevicesQueryType, DeleteDeviceMutationType } from '../../graphql/device-graphql';
import { deviceColourTypePair, brandNamesPair, deviceTypePair } from 'common/enums';
import { useQuery, useMutation } from 'react-apollo-hooks';
import Table from '../../components/table/Table';

import TableRibbons from '../../components/ribbons/TableRibbon';
import RadioButton from '../../components/ribbons/RadioRibbon';
import ShowErrorNotification from '../../components/showErrorNotification/ShowErrorNotification';

const entityName = 'device';
const columns = [
  {
    title: 'Kod',
    dataIndex: 'code',
    sorter: true
  },
  {
    title: 'Seri Numara',
    dataIndex: 'serialNumber'
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
    title: 'Marka',
    dataIndex: 'brandName',
    sorter: true,
    filters: brandNamesPair,
    render: (text, record, index) => (text && brandNamesPair.find(x => x.value === text).text) || ''
  },
  {
    title: 'Model',
    dataIndex: 'model',
    sorter: true
  },
  {
    title: 'Tip',
    dataIndex: 'deviceType',
    filters: deviceTypePair,
    render: (text, record, index) => (text && deviceTypePair.find(x => x.value === text).text) || ''
  },
  {
    title: 'Renk',
    dataIndex: 'colourType',
    filters: deviceColourTypePair,
    render: (text, record, index) => (text && deviceColourTypePair.find(x => x.value === text).text) || ''
  }
];

const DeviceList = props => {
  const [filteredColumns, setFilteredColumns] = useState(columns);
  const [deviceOwner, setDeviceOwner] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const fetchQuery = useQuery(DevicesQueryType);
  const [deleteRecords, { loading: isDeleting, error: deleteError }] = useMutation(DeleteDeviceMutationType);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  useEffect(() => {
    var data = fetchQuery.data && fetchQuery.data[Object.keys(fetchQuery.data)];
    if (!data) return;
    switch (deviceOwner) {
      case 1: //customer
        setDataSource(data.filter(x => !!x.customer));
        setFilteredColumns(columns);
        break;
      case 2: //stock
        setFilteredColumns(columns.filter(x => x.dataIndex !== 'customerTitle'));
        setDataSource(data.filter(x => !x.customer));
        break;
      case 0:
      default:
        var customerNameColumn = columns.find(x => x.dataIndex === 'customerTitle');
        customerNameColumn.filters = data.map(x => ({ text: `${x.customer.code} - ${x.customer.title}`, value: x.customer.code }));
        customerNameColumn.onFilter = (value, record) => record.customer.code === value;
        //columns.find(x => x.dataIndex === 'customerTitle').filters = deviceColourTypePair
        setFilteredColumns(columns);
        setDataSource(data);
    }
  }, [deviceOwner, fetchQuery]);

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
      await deleteRecords({ variables: { _ids: selectedItemIds }, refetchQueries: () => [{ query: props.fetchQueryType }] });
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
          await deleteRecords({ variables: { _ids: selectedItemIds }, refetchQueries: () => [{ query: DevicesQueryType }] });
        }}
      />
    );
  return (
    <div>
      <TableRibbons onNewButton={onNewRibbonButton} onReloadButton={onReloadRibbonButton} onDeleteButton={onDeleteRibbonButton}>
        <RadioButton
          defaultText="Tüm Kayıtlar"
          options={[
            { text: 'Tüm Kayıtlar', onClick: () => setDeviceOwner(0) },
            { text: 'Müşteri', onClick: () => setDeviceOwner(1) },
            { text: 'Depo', onClick: () => setDeviceOwner(2) }
          ]}
        />
      </TableRibbons>
      <Table columns={filteredColumns} onItemClick={onItemClick} onSelectChange={setSelectedItemIds} loading={fetchQuery.loading} dataSource={dataSource} />
    </div>
  );
};
export default DeviceList;
