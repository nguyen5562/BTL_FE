import { Image, Modal, Table } from 'antd'
import React from 'react'
import { convertPrice } from '../../utils';
import { serverConfig } from '../../const/serverConfig';

const OrderDetail = ({ isModalOpen, onClose, orderItems, totalPrice }) => {
    const columns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <Image src={`${serverConfig.server}/uploads/${image}`} width={100} />
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => convertPrice(price)
        },
        {
            title: 'Thành tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (totalPrice) => convertPrice(totalPrice)
        },
    ];

    return (
        <Modal
            title='Chi tiết đơn hàng'
            open={isModalOpen}
            onCancel={onClose}
            footer={null}
            width={1000}
        >
            <Table
                dataSource={orderItems}
                columns={columns}
                summary={() => (
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={4}>
                        <strong>Tổng cộng</strong>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2}>
                        <strong style={{ color: 'red' }}>{convertPrice(totalPrice)}</strong>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  )}
            />
        </Modal>
    )
}

export default OrderDetail