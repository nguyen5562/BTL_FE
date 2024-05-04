import { Table } from 'antd'
import React, { useState } from 'react'

const TableComponent = (props) => {
  const { selectionType = 'checkbox', columns, data } = props

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
    }
  };

  const [rowSelectedKeys, setRowSelectedKeys] = useState([])

  return (
    <div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </div>
  )
}

export default TableComponent