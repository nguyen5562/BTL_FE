import { Button, Col, Image, Input, InputNumber, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { WrapperAdd, WrapperInputNumber, WrapperProductName, WrapperQualityProduct } from './style'
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import { productService } from '../../services/ProductService'
import { Rating } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderProduct } from '../../redux/slides/orderSlide'

const ProductDetailComponent = ({ id }) => {
  const [stateProductDetail, setStateProductDetail] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    stock: '',
    price: '',
    image: ''
  })

  const fetchProductDetail = async () => {
    const res = await productService.getProduct(id)
    setStateProductDetail({
      ...stateProductDetail,
      name: res.data.name,
      description: res.data.description,
      category: res.data.category,
      brand: res.data.brand,
      stock: res.data.stock,
      price: res.data.price,
      image: res.data.image
    })
  }

  useEffect(() => {
    fetchProductDetail()
  }, []);

  const [quantity, setQuantity] = useState(1)
  const decrease = () => {
    setQuantity(quantity - 1)
  }
  const increase = () => {
    setQuantity(quantity + 1)
  }

  const onChangeAmount = (e) => {
    setQuantity(e)
  }

  const user = useSelector((state) => state.user)
  const params = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOrderPage = () => {
    if (user?.id) {
      navigate('/order')
    } else navigate('/sign-in', { state: params.id })
  }

  const handleAddOrderProduct = () => {
    if (user?.id) {
      dispatch(addOrderProduct({
        orderItems: {
          product: id,
          quantity: quantity,
          price: stateProductDetail.price,
          stock: stateProductDetail.stock,
          name: stateProductDetail.name,
          image: stateProductDetail.image
        }
      }))
      //navigate('/order')

    } else navigate('/sign-in', { state: params.id })
  }

  return (
    <Row style={{ padding: '16px', background: '#fff', height: '1000px' }}>
      <Col span={12}>
        <Image src={stateProductDetail.image} alt='image product' preview={false} />
      </Col>

      <Col span={12}>
        <WrapperProductName>{stateProductDetail.name}</WrapperProductName>

        <div>
          {/* <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }}/>
            <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }}/>
            <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }}/> */}
          <Rating name="half-rating" defaultValue={2.5} precision={0.1} readOnly style={{ fontSize: '20px' }} />

          <span style={{ fontSize: '20px', lineHeight: '24px', color: 'rgb(120, 120, 120)' }}> | Đã bán 100+</span>
        </div>

        <div style={{ borderRadius: '4px' }}>
          <h1 style={{ fontSize: '32px', lineHeight: '40px', marginRight: '8px', fontWeight: '500' }}>{stateProductDetail.price}<sup>₫</sup></h1>
        </div>

        <div>
          <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }} >
            <Button onClick={decrease} disabled={quantity === 1}><MinusOutlined /></Button>
            <InputNumber controls={false} min={0} max={stateProductDetail.stock} value={quantity} style={{ width: '60px' }} onChange={onChangeAmount} />
            <Button onClick={increase} disabled={quantity >= stateProductDetail.stock}><PlusOutlined /></Button>
          </div>
          {quantity === stateProductDetail.stock && <span>Đã đạt giới hạn</span>}
        </div>


        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ButtonComponent
            size={40}
            styleButton={{ background: 'rgb(255, 57, 69)', border: 'none', height: '48px', width: '220px' }}
            textbutton={'Mua ngay'}
            styleText={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            onClick={handleOrderPage}
          ></ButtonComponent>

          <ButtonComponent
            size={40}
            styleButton={{ background: '#fff', border: '1px solid rgb(13, 92, 182)', height: '48px', width: '220px' }}
            textbutton={'Thêm vào giỏ hàng'}
            styleText={{ color: 'rgb(13, 92, 182)', fontSize: '15px', fontWeight: '700' }}
            onClick={handleAddOrderProduct}
          ></ButtonComponent>
        </div>
      </Col>
    </Row>
  )
}

export default ProductDetailComponent