import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { withRouter } from 'react-router-dom';
import Table from '../../components/table/Table';

import TableRibbons from '../../components/ribbons/TableRibbon';
import ShowErrorNotification from '../../components/showErrorNotification/ShowErrorNotification';

const TableContainer = props => {
  const fetchQuery = useQuery(props.fetchQueryType, { fetchPolicy: 'network-only' });
  const [deleteRecords, { loading: isDeleting, error: deleteError }] = useMutation(props.deleteMutationType);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const onSelectChange = selectedRowKeys => {
    setSelectedItemIds(selectedRowKeys);
  };

  const onItemClick = record => {
    props.history.push(`/${props.entityName}/${record._id}`);
  };

  const onNewRibbonButton = () => ({
    onClick: () => {
      props.history.push(`/${props.entityName}/new`);
    },
    disabled: false,
    loading: false
  });

  const onReloadRibbonButton = () => ({
    onClick: async () => {
      await fetchQuery.refetch();
    },
    disabled: fetchQuery.loading,
    loading: fetchQuery.loading
  });

  const onDeleteRibbonButton = () => ({
    onClick: async () => {
      await deleteRecords({ variables: { _ids: selectedItemIds }, refetchQueries: () => [{ query: props.fetchQueryType }] });
      setSelectedItemIds([]);
    },
    disabled: selectedItemIds.length === 0,
    loading: isDeleting
  });
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
          await deleteRecords({ variables: { _ids: selectedItemIds }, refetchQueries: () => [{ query: props.fetchQueryType }] });
        }}
      />
    );
  return (
    <div>
      <TableRibbons onNewButton={onNewRibbonButton()} onReloadButton={onReloadRibbonButton()} onDeleteButton={onDeleteRibbonButton()} />
      <Table
        columns={columns}
        onItemClick={onItemClick}
        onSelectChange={onSelectChange}
        loading={loading}
        dataSource={data}
      />
    </div>
  );
};

export default withRouter(TableContainer);

TableContainer.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  deleteMutationType: PropTypes.object.isRequired,
  entityName: PropTypes.string.isRequired,
  queryString: PropTypes.string.isRequired
};
