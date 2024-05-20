import React, { useState } from 'react'
import { orderService } from '../../services/OrderService';
import { useEffect } from 'react';
import { Button, Popconfirm, Space, Table, message } from 'antd';
import Loading from '../Loading/Loading';
import { CloseCircleOutlined, DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import OrderDetail from '../OrderDetail/OrderDetail';
import { formatDate } from '../../utils';

const AdminOrder = () => {
  const [orders, setOders] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [id, setId] = useState('')
  const [orderItems, setOrderItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await orderService.getAllOrder();
      setOders(response.data.map((order, index) => ({ ...order, index: index + 1, key: order._id })));
      setLoading(false)
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  const rowSelection = {
    rowSelectedKeys,
    onChange: (selectedKeys) => {
      setRowSelectedKeys(selectedKeys);
    },
  };

  const handleDeleteSelected = async () => {
    for (let index = 0; index < rowSelectedKeys.length - 1; index++) {
      const id = rowSelectedKeys[index];
      await orderService.deleteOrder(id)
    }
    const index = rowSelectedKeys.length - 1
    await orderService.deleteOrder(rowSelectedKeys[index])
      .then(() => fetchOrders())

    message.success("Xoá thành công")
    setRowSelectedKeys([])
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Người đặt',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (orderDate) => formatDate(orderDate)
    },
    {
      title: 'Người nhận',
      dataIndex: 'recipient',
      key: 'recipient',
    },
    {
      title: 'Địa chỉ nhận hàng',
      dataIndex: 'shippingAddress',
      key: 'shippingAddress',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Đã hủy', value: 0 },
        { text: 'Chờ xác nhận', value: 1 },
        { text: 'Đã giao hàng', value: 2 },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        switch (status) {
          case 0:
            return 'Đã hủy'
          case 1:
            return 'Chờ xác nhận'
          case 2:
            return 'Đã giao hàng'
        }
      },
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          {record.status === 1 && (
            <>
              <Button type="primary" icon={<EditOutlined />}
                onClick={async () => {
                  await orderService.updateOrder(record.key)
                    .then(() => fetchOrders())
                }}
              >
                Xác nhận
              </Button>
              <Button danger type="primary" icon={<CloseCircleOutlined />}
                onClick={async () => {
                  await orderService.cancelOrder(record.key)
                    .then(() => fetchOrders())
                }}
              >
                Hủy
              </Button>
            </>
          )}
          <Button type='primary' color='green' icon={<InfoCircleOutlined />}
            onClick={async () => {
              setOrderItems(record.orderItems)
              setTotalPrice(record.totalPrice)
              setIsModalOpen(true)
            }}
          >
            Chi tiết
          </Button>
        </Space>
      )
    },
  ];

  return (
    <div>
      <h1 style={{ color: '#000', fontSize: '18px' }}>Quản lý đơn hàng</h1>
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa các đơn hàng đã chọn?"
        onConfirm={handleDeleteSelected}
        okText="Yes"
        cancelText="No"
        disabled={rowSelectedKeys.length === 0}
      >
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          disabled={rowSelectedKeys.length === 0}
          danger
        >
          Xóa các hãng được chọn
        </Button>
      </Popconfirm>
      <div style={{ marginTop: '20px' }}>
        <Loading isLoading={isLoading} >
          <Table
            dataSource={orders}
            columns={columns}
            rowSelection={rowSelection}
            pagination={{
              position: 'bottom',
              total: orders.length, // Tổng số items
              showSizeChanger: true, // Hiển thị chọn pageSize
              pageSizeOptions: ['5', '10', '20'] // Các lựa chọn pageSize
            }}
          />
        </Loading>
      </div>
      <OrderDetail
        isModalOpen={isModalOpen}
        onClose={handleClose}
        orderItems={orderItems}
        totalPrice={totalPrice}
      />
    </div>
  )
}

export default AdminOrder