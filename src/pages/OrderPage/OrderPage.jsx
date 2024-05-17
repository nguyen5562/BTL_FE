import { Button, Checkbox, Form, InputNumber } from 'antd'
import React, { useEffect, useState } from 'react'
import { CustomCheckbox, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDilivery, WrapperTotal } from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeOrderProduct, setQuantity } from '../../redux/slides/orderSlide';


const OrderPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [form] = Form.useForm();

  const dispatch = useDispatch()

  const handleChangeCount = () => {

  }

  const increase = (idProduct) => {
    dispatch(increaseQuantity(idProduct))
  }

  const decrease = (idProduct) => {
    dispatch(decreaseQuantity(idProduct))
  }

  const deleteOrder = (idProduct) => {
    dispatch(removeOrderProduct(idProduct))
  }

  const onChangeAmount = (idProduct, value) => {
    dispatch(setQuantity({idProduct, quantity: value}))
  }
  
  return (
    <>
      {order.orderItems.length === 0 ? (
        <p style={{ fontWeight: 'bold', marginTop: '30px', marginLeft: '120px' }}>Chưa có sản phẩm nào trong giỏ hàng</p>
      ) : (
        <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
          <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
            <h3 style={{ fontWeight: 'bold' }}>Giỏ hàng</h3>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <WrapperLeft>
                <WrapperStyleHeader>
                  <span style={{ display: 'inline-block', width: '390px' }}>
                    <span style={{ fontSize: '16px' }}> Tất cả ({order.orderItems.length} sản phẩm)</span>
                  </span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '16px' }}>Đơn giá</span>
                    <span style={{ fontSize: '16px' }}>Số lượng</span>
                    <span style={{ fontSize: '16px' }}>Thành tiền</span>
                    <span style={{ cursor: 'pointer' }} />
                  </div>
                </WrapperStyleHeader>
                <WrapperListOrder>
                  {order.orderItems.map((orderItem) => {
                    return (
                      <WrapperItemOrder>
                        <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <img src={orderItem.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                          <div style={{
                            width: 260,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>{orderItem.name}</div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span>
                            <span style={{ fontSize: '16px', color: '#242424' }}>{orderItem.price}<sup style={{ fontSize: '16px' }}>₫</sup></span>
                          </span>
                          <WrapperCountOrder>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => decrease(orderItem.product)} disabled={orderItem.quantity === 1}><MinusOutlined style={{ color: '#000', fontSize: '10px' }} /></button>
                            <InputNumber size='small' controls={false} min={0} max={orderItem.stock} value={orderItem.quantity} onChange={(value) => onChangeAmount(orderItem.product, value)} style={{ borderRadius: '0px' }} />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => increase(orderItem.product)} disabled={orderItem.quantity >= orderItem.stock}><PlusOutlined style={{ color: '#000', fontSize: '10px' }} /></button>
                          </WrapperCountOrder>
                          <span style={{ color: 'rgb(255, 66, 78)', fontSize: '16px', fontWeight: 500 }}>{orderItem.price * orderItem.quantity}<sup style={{ fontSize: '16px' }}>₫</sup></span>
                          <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => deleteOrder(orderItem.product)} />
                        </div>
                      </WrapperItemOrder>
                    )
                  })}
                </WrapperListOrder>
              </WrapperLeft>
              <WrapperRight>
                <div style={{ width: '100%' }}>
                  <WrapperInfo>
                    <div>
                      <span>Địa chỉ: Đông Sơn, Đông Hưng, Thái Bình</span>
                      <span> - </span>
                      <span style={{ color: '#9255FD', cursor: 'pointer' }}>Thay đổi</span>
                    </div>
                  </WrapperInfo>
                  <WrapperInfo>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Tạm tính</span>
                      <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Giảm giá</span>
                      <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Phí giao hàng</span>
                      <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}></span>
                    </div>
                  </WrapperInfo>
                  <WrapperTotal>
                    <span>Tổng tiền</span>
                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}></span>
                      <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                    </span>
                  </WrapperTotal>
                </div>
                <ButtonComponent
                  // onClick={() => handleAddCard()}
                  size={40}
                  styleButton={{
                    background: 'rgb(255, 57, 69)',
                    height: '48px',
                    width: '320px',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                  textbutton={'Mua hàng'}
                  styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                ></ButtonComponent>
              </WrapperRight>
            </div>
          </div>
          {/* <ModalComponent title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancleUpdate} onOk={handleUpdateInforUser}>
        <Loading isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please input your city!' }]}
            >
              <InputComponent value={stateUserDetails['city']} onChange={handleOnchangeDetails} name="city" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input your  phone!' }]}
            >
              <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
            </Form.Item>

            <Form.Item
              label="Adress"
              name="address"
              rules={[{ required: true, message: 'Please input your  address!' }]}
            >
              <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent> */}
        </div>
      )}
    </>


  )
}

export default OrderPage