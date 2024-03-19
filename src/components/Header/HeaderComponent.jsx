import React from "react";
import { Col } from "antd";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount } from "./style";
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";

const HeaderComponent = () => {
    return (
        <div>
            <WrapperHeader gutter={16}>
                <Col span={6}>
                    <WrapperTextHeader>
                        My Shop
                    </WrapperTextHeader>
                </Col>

                <Col span={12}>
                    <ButtonInputSearch 
                        size = "large" 
                        placeholder = "Tìm sản phẩm" 
                        textbutton = "Tìm kiếm"
                        backgroundcolorinput = '#fff'
                        backgroundcolorbutton = 'rgb(13, 92, 182)'
                        colorbutton = '#000'
                    />
                </Col>

                <Col span={6} style={{display: 'flex', gap: '20px'}}>
                    <WrapperHeaderAccount>
                        <UserOutlined style={{fontSize: '30px'}} />
                        <div>
                            <span>Đăng nhập/Đăng kí</span>
                            <div>
                                <span>Tài khoản</span>
                                <CaretDownOutlined />
                            </div>
                        </div>
                    </WrapperHeaderAccount>

                    <WrapperHeaderAccount>
                        <ShoppingCartOutlined style={{fontSize: '30px'}} />
                        <span>Giỏ hàng</span>
                    </WrapperHeaderAccount>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent