import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import { useParams } from 'react-router-dom'

const ProductDetailPage = () => {
  const {id} = useParams()

  return (
    <div style={{ padding: '0 120px', background: '#efefef', height: '1000px'}}>
      <h5>Trang chủ - Chi tiết sản phẩm</h5>
      <ProductDetailComponent id={id} />
    </div>
  )
}

export default ProductDetailPage