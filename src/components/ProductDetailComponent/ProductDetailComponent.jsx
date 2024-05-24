import { Button, Col, Image, InputNumber, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { WrapperProductName } from './style'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import { productService } from '../../services/ProductService'
import { Rating } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderProduct } from '../../redux/slides/orderSlide'
import { convertPrice } from '../../utils'
import { serverConfig } from '../../const/serverConfig'

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
  }, [])

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

  const renderDescription = (description) => {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: description }}
      />
    );
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
    <>
      <Row style={{ padding: '16px', height: 'auto' }}>
        <Col span={12} style={{ background: '#fff', borderRadius: '10px' }} >
          <Image style={{ borderRadius: '10px' }} src={`${serverConfig.server}/uploads/${stateProductDetail.image}`} alt='image product' preview={false} />
        </Col>

        <Col span={11} offset={1} style={{ background: '#fff', borderRadius: '10px', padding: '10px' }}>
          <WrapperProductName>{stateProductDetail.name}</WrapperProductName>

          {/* <div>
            <Rating name="half-rating" defaultValue={2.5} precision={0.1} readOnly style={{ fontSize: '20px' }} />

            <span style={{ fontSize: '20px', lineHeight: '24px', color: 'rgb(120, 120, 120)' }}> | Đã bán 100+</span>
          </div> */}

          <div style={{ borderRadius: '4px' }}>
            <h1 style={{ fontSize: '32px', lineHeight: '40px', marginRight: '8px', fontWeight: '500' }}>{convertPrice(stateProductDetail.price)}</h1>
          </div>

          <div>
            <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }} >
              <Button onClick={decrease} disabled={quantity === 1}><MinusOutlined /></Button>
              <InputNumber controls={false} min={0} max={stateProductDetail.stock} value={quantity} style={{ width: '60px' }} onChange={onChangeAmount} />
              <Button onClick={increase} disabled={quantity >= stateProductDetail.stock}><PlusOutlined /></Button>
            </div>
            {quantity === stateProductDetail.stock && <span style={{ color: 'red' }}>Số lượng mặt hàng trong kho là {stateProductDetail.stock}</span>}
          </div>


          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px', marginBottom: '10px' }}>
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
      <Row style={{ padding: '16px', margin: '16px', height: 'auto', background: '#fff', borderRadius: '10px' }}>
          {renderDescription(stateProductDetail.description)}
      </Row>
    </>

  )
}

export default ProductDetailComponent