import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'

const ProductDetailPage = () => {
  const { id } = useParams()

  return (
    <div>
      <div style={{ padding: '0 120px', background: '#efefef', height: 'auto' }}>
      <div style={{ fontWeight: 'bold', fontSize: '20px', background: '#efefef', padding: '20px' }}>Chi tiết sản phẩm</div>
      <ProductDetailComponent id={id} />
    </div>
    </div>
    
  )
}

export default ProductDetailPage