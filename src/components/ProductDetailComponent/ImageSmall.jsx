import React from 'react'
import imgSmall from '../../assets/images/imagesmall.webp'
import { Image, Col } from 'antd'

const ImageSmall = (props) => {
  return (
    <Col span={4} style={{ flexBasis: 'unset', display: 'flex' }}>
        <Image style={{ height: '64px', width: '64px' }} 
                src={imgSmall} 
                alt='image small' 
                preview={false} />
    </Col>
  )
}

export default ImageSmall