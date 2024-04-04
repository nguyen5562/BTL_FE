import { Col, Image, Row } from 'antd'
import React from 'react'
import img from '../../assets/images/test.webp'
import ImageSmall from './ImageSmall'
import { WrapperAdd, WrapperInputNumber, WrapperProductName, WrapperQualityProduct } from './style'
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ProductDetailComponent = () => {
  const onchange = () => {}
  return (
    <Row style={{ padding: '16px', background: '#fff'}}>
        <Col span={10}>
          <Image src={img} alt='image product' preview={false} />

          <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
            <ImageSmall />

            <ImageSmall />

            <ImageSmall />

            <ImageSmall />

            <ImageSmall />

            <ImageSmall />
          </Row>
        </Col>

        <Col span={14}>
          <WrapperProductName>Sách thám tử lừng danh Conan</WrapperProductName>

          <div>
            <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }}/>
            <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }}/>
            <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }}/>

            <span style={{ fontSize: '15px', lineHeight: '24px', color: 'rgb(120, 120, 120)' }}> | Đã bán 100+</span>
          </div>

          <div style={{ background: 'rgb(250, 250, 250)', borderRadius: '4px' }}>
            <h1 style={{ fontSize: '32px', lineHeight: '40px', marginRight: '8px', fontWeight: '500' }}>200.000đ</h1>
          </div>

          <WrapperAdd>
            <span>Giao đến </span>
            <span className='add'>Đông Hưng, Thái Bình</span> - 
            <span className='change-add'> Đổi địa chỉ</span>
          </WrapperAdd> 

          <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
            <div style={{ marginBottom: '10px' }}>Số lượng</div>
            <WrapperQualityProduct>
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} >
                    <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                </button>
                <WrapperInputNumber onChange={onchange} defaultValue={1} size="small" />
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} >
                    <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                </button>
            </WrapperQualityProduct>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ButtonComponent
              size={40}
              styleButton={{ background: 'rgb(255, 57, 69)', border: 'none', height: '48px', width: '220px' }}
              textbutton={'Mua ngay'}
              styleText={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>

            <ButtonComponent
              size={40}
              styleButton={{ background: '#fff', border: '1px solid rgb(13, 92, 182)', height: '48px', width: '220px' }}
              textbutton={'Mua trả sau'}
              styleText={{ color: 'rgb(13, 92, 182)', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </div>
        </Col>
    </Row>
  )
}

export default ProductDetailComponent