import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import { withRouter } from 'react-router-dom';
import Table from '../../components/table/Table';

import TableRibbons from '../../components/ribbons/TableRibbon';
import ShowErrorNotification from '../../components/showErrorNotification/ShowErrorNotification';

const TableContainer = props => {
  const fetchQuery = props.fetchQuery;
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
      props.history.push(`/${props.entityName}/new?${props.queryString}`);
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
        columns={props.columns}
        onItemClick={onItemClick}
        onSelectChange={onSelectChange}
        loading={fetchQuery.loading}
        dataSource={fetchQuery.loading ? [] : fetchQuery.data[Object.keys(fetchQuery.data)]}
      />
    </div>
  );
};

TableContainer.propTypes = {
  columns: PropTypes.array.isRequired,
  fetchQuery: PropTypes.object.isRequired,
  deleteMutationType: PropTypes.object.isRequired,
  entityName: PropTypes.string.isRequired,
  queryString: PropTypes.string.isRequired
};

export default withRouter(TableContainer);
