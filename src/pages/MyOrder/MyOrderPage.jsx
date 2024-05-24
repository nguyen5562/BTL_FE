import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading';
import { useSelector } from 'react-redux';
import { convertPrice, formatDate } from '../../utils';
import { WrapperItemOrder, WrapperListOrder, WrapperHeaderItem, WrapperFooterItem, WrapperContainer, WrapperStatus } from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { orderService } from '../../services/OrderService';
import { message } from 'antd';
import { serverConfig } from '../../const/serverConfig';

const MyOrderPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const user = useSelector((state) => state.user)

  const fetchOrder = async () => {
    setIsLoading(true)
    const response = await orderService.getAllOrderByUser(user.id)
    setOrders(response.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  console.log(orders)

  const handleCanceOrder = async (id) => {
    await orderService.cancelOrder(id)
      .then(() => fetchOrder())
    message.success('Hủy đơn hàng thành công')
  }

  const getStatus = (status) => {
    switch (status) {
      case 0:
        return 'Đã hủy'
      case 1:
        return 'Chờ xác nhận'
      case 2:
        return 'Chờ giao hàng'
      case 3:
        return 'Đã giao hàng'
    }
  }

  const renderProduct = (data) => {
    return data?.map((order) => {
      return <WrapperHeaderItem key={order?._id}>
        <img src={`${serverConfig.server}/uploads/${order?.image}`}
          style={{
            width: '70px',
            height: '70px',
            objectFit: 'cover',
            border: '1px solid rgb(238, 238, 238)',
            padding: '2px'
          }}
        />
        <div style={{
          width: 260,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginLeft: '10px',
          fontSize: '16px'
        }}>
          <div>{order?.name}</div>
          <div style={{ marginTop: '15px', color: 'gray' }}>SL: x{order.quantity}</div>
        </div>
        <span style={{ fontSize: '16px', color: '#242424', marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
      </WrapperHeaderItem>
    })
  }

  return (
    <Loading isLoading={isLoading}>
      {orders.length === 0 ? (
        <p style={{ fontWeight: 'bold', marginTop: '30px', marginLeft: '120px', height: '100vh' }}>Bạn chưa có đơn hàng nào</p>
      ) : (
        <WrapperContainer>
          <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
            <div style={{ fontWeight: 'bold', fontSize: '20px', padding: '20px', paddingLeft: '160px' }}>Đơn hàng của tôi</div>
            <WrapperListOrder>
              {orders?.map((order) => {
                return (
                  <WrapperItemOrder key={order?._id}>
                    <WrapperStatus>
                      <div>
                        <span style={{ fontSize: '16px' }}>Trạng thái: </span>
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                          {getStatus(order.status)}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontSize: '16px' }}>Địa chỉ giao hàng: </span>
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                          {`${order.recipient}, ${order.phone}, ${order.shippingAddress}`}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontSize: '16px' }}>Ngày đặt: </span>
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                          {formatDate(order.orderDate)}
                        </span>
                      </div>
                    </WrapperStatus>
                    {renderProduct(order?.orderItems)}
                    <WrapperFooterItem>
                      <div>
                        <span style={{ color: 'rgb(255, 66, 78)', fontSize: '16px' }}>Tổng tiền: </span>
                        <span
                          style={{ fontSize: '16px', color: 'rgb(255, 66, 78)', fontWeight: 700 }}
                        >{convertPrice(order?.totalPrice)}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {order.status === 1 &&
                          <ButtonComponent
                            type='primary' danger
                            onClick={() => handleCanceOrder(order._id)}
                            size={40}
                            styleButton={{
                              height: '36px',
                              borderRadius: '4px'
                            }}
                            textbutton={'Hủy đơn hàng'}
                            styleTextButton={{ color: '#9255FD', fontSize: '16px' }}
                          >
                          </ButtonComponent>
                        }
                      </div>
                    </WrapperFooterItem>
                  </WrapperItemOrder>
                )
              })}
            </WrapperListOrder>
          </div>
        </WrapperContainer>
      )}
    </Loading>
  )
}

export default MyOrderPage