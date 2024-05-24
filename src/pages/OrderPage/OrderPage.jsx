import { Button, Form, Input, InputNumber, Modal, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperTotal } from './style'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, increaseQuantity, removeAllOrderProduct, removeOrderProduct, setQuantity } from '../../redux/slides/orderSlide'
import { convertPrice } from '../../utils'
import axios from 'axios'
import { orderService } from '../../services/OrderService'
import Loading from '../../components/Loading/Loading'
import { serverConfig } from '../../const/serverConfig'

const OrderPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const [form] = Form.useForm()
  const dispatch = useDispatch()

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
    dispatch(setQuantity({ idProduct, quantity: value }))
  }

  const totalPrice = () => {
    return order.orderItems.reduce((total, orderItem) => {
      return total + orderItem.quantity * orderItem.price
    }, 0)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState(' Khôi Nguyên')
  const [phone, setPhone] = useState('0354866976')
  const [province, setProvince] = useState('Thái Bình')
  const [district, setDistrict] = useState('huyện Đông Hưng')
  const [ward, setWard] = useState('xã Đông Sơn')
  const [address, setAddress] = useState('xóm 3, thôn Trung')

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onFinish = (value) => {
    const { name, phone, address, ward, district, province } = value
    setName(name)
    setPhone(phone)
    setAddress(address)
    setWard(ward)
    setDistrict(district)
    setProvince(province)
    setIsModalOpen(false)
    form.resetFields()
    setSelectedCity(null)
    setSelectedDistrict(null)
  }

  const { Option } = Select;

  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const fetchData = async () => {
    const result = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
    setCities(result.data)
    setData(result.data)
  }

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setDistricts(data.find(city => city.Name === value)?.Districts || []);
    setWards([]);
    form.setFieldsValue({
      district: undefined,
      ward: undefined,
    });
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    const city = data.find(city => city.Name === selectedCity);
    setWards(city?.Districts.find(district => district.Name === value)?.Wards || []);
    form.setFieldsValue({
      ward: undefined,
    });
  };

  useEffect(() => {
    fetchData()
  }, [])

  const [isLoading, setIsLoading] = useState(false)

  const handleAddOrder = async () => {
    setIsLoading(true)
    let shippingAddress = `${address}, ${ward}, ${district}, ${province}`
    let data = {
      shippingAddress: shippingAddress,
      recipient: name,
      phone: phone,
      orderDate: Date.now(),
      paymentMethod: 'Thanh toan khi nhan hang',
      status: 1,
      totalPrice: totalPrice(),
      user: user.id,
      orderItems: order.orderItems.map(item => {
        return {
          product: item.product,
          name: item.name,
          image: item.image,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.price * item.quantity
        }
      })
    }
    const res = await orderService.createOrder(data)
      .then(() => dispatch(removeAllOrderProduct()))
    setIsLoading(false)
    message.success("Mua hàng thành công")
  }

  return (
    <Loading isLoading={isLoading}>
      {/* {contextHolder} */}
      {order.orderItems.length === 0 ? (
        <p style={{ fontWeight: 'bold', marginTop: '30px', marginLeft: '120px', height: '100vh' }}>Chưa có sản phẩm nào trong giỏ hàng</p>
      ) : (
        <div style={{ background: '#efefef', with: '100%', height: '100vh', paddingBottom: '20px' }}>
          <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
            <div style={{ fontWeight: 'bold', fontSize: '20px', padding: '20px' }}>Giỏ hàng</div>
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
                          <img src={`${serverConfig.server}/uploads/${orderItem.image}`} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                          <div>
                            <div style={{
                              fontSize: '16px',
                              width: 260,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>{orderItem.name}</div>
                            <div style={{ fontSize: '10px', color: 'rgb(128, 128, 137)' }}>Số lượng trong kho: {orderItem.stock}</div>
                          </div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span>
                            <span style={{ fontSize: '16px', color: '#242424' }}>{convertPrice(orderItem.price)}</span>
                          </span>
                          <WrapperCountOrder>
                            <Button size='small' style={{ border: 'none' }} onClick={() => decrease(orderItem.product)} disabled={orderItem.quantity === 1}><MinusOutlined style={{ color: '#000', fontSize: '10px' }} /></Button>
                            <InputNumber size='small' controls={false} min={0} max={orderItem.stock} value={orderItem.quantity} onChange={(value) => onChangeAmount(orderItem.product, value)} style={{ borderRadius: '0px' }} />
                            <Button size='small' style={{ border: 'none' }} onClick={() => increase(orderItem.product)} disabled={orderItem.quantity >= orderItem.stock}><PlusOutlined style={{ color: '#000', fontSize: '10px' }} /></Button>
                          </WrapperCountOrder>
                          <span style={{ color: 'rgb(255, 66, 78)', fontSize: '16px', fontWeight: 500 }}>{convertPrice(orderItem.price * orderItem.quantity)}</span>
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
                      <span style={{ color: 'rgb(128, 128, 137)' }}>Giao tới</span>
                      <span onClick={() => setIsModalOpen(true)} style={{ color: 'rgb(11, 116, 229)', cursor: 'pointer', paddingLeft: '160px' }}>Thay đổi</span>
                    </div>
                  </WrapperInfo>
                  <WrapperInfo>
                    <div style={{ display: 'flex' }}>
                      <span style={{ color: 'rgb(56, 56, 61)', fontWeight: '600', wordBreak: 'break-word' }}>{name}</span>
                      <span style={{ color: 'rgb(235, 235, 240)', margin: '0px 8px' }}>|</span>
                      <span style={{ color: 'rgb(56, 56, 61)', fontWeight: '600', wordBreak: 'break-word' }}>{phone}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: 'rgb(128, 128, 137)', fontWeight: 'normal' }}>{address}, {ward}, {district}, {province}</span>
                    </div>
                  </WrapperInfo>
                  <br />
                  <WrapperTotal>
                    <span>Tổng tiền</span>
                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPrice())}</span>
                    </span>
                  </WrapperTotal>
                </div>
                <ButtonComponent
                  onClick={() => handleAddOrder()}
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
          <Modal title='Cập nhật thông tin giao hàng' open={isModalOpen} onCancel={handleCancel} footer={null} >
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onFinish={onFinish}
              autoComplete="off"
              form={form}
            >
              <Form.Item
                label="Họ tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập họ tên!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập số điện thoại!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Tỉnh/Thành phố"
                name="province"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập tỉnh/thành phố!',
                  },
                ]}
              >
                <Select
                  showSearch
                  onChange={handleCityChange}
                >
                  {cities.map(city => (
                    <Option key={city.Id} value={city.Name}>{city.Name}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Quận/Huyện"
                name="district"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập quận/huyện!',
                  },
                ]}
              >
                <Select showSearch onChange={handleDistrictChange} disabled={!selectedCity}>
                  {districts.map(district => (
                    <Option key={district.Id} value={district.Name}>{district.Name}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Phường/Xã"
                name="ward"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập phường/xã!',
                  },
                ]}
              >
                <Select showSearch disabled={!selectedDistrict}>
                  {wards.map(ward => (
                    <Option key={ward.Id} value={ward.Name}>{ward.Name}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập địa chỉ!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </Loading>
  )
}

export default OrderPage