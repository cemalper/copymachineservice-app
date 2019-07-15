import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table as AntTable } from 'antd';

const Table = props => {
  const { columns, onItemClick, dataSource, loading, onSelectChange } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
    onSelectChange(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange,
    columnWidth: '%',
    columnTitle: ''
  };

  return (
    <AntTable
      size="small"
      dataSource={dataSource}
      rowKey={record => record._id}
      pagination={{ pageSize: 50, position: 'bottom' }}
      columns={columns}
      loading={loading}
      rowSelection={rowSelection}
      onRow={record => ({
        onDoubleClick: () => {
          onItemClick && onItemClick(record);
        }
      })}
    />
  );
};

export default Table;
Table.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array,
  onItemClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onSelectChange: PropTypes.func
};
