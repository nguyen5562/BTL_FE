import React, { useEffect } from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import { useLocation, useParams } from 'react-router-dom'

const ProductDetailPage = () => {
  const { id } = useParams()
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <div style={{ padding: '0 120px', background: '#efefef', height: 'auto', marginBottom: '20px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '20px', background: '#efefef', padding: '20px' }}>Chi tiết sản phẩm</div>
        <ProductDetailComponent id={id} />
      </div>
    </div>

  )
}

export default ProductDetailPage