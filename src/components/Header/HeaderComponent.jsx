import React from "react";
import { Badge, Col } from "antd";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount } from "./style";
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderComponent = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)

    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }

    return (
        <div>
            <WrapperHeader>
                <Col span={5}>
                    <WrapperTextHeader>
                        My Shop
                    </WrapperTextHeader>
                </Col>

                <Col span={13}>
                    <ButtonInputSearch
                        size="large"
                        placeholder="Tìm sản phẩm"
                        textbutton="Tìm kiếm"
                        backgroundcolorinput='#fff'
                        backgroundcolorbutton='rgb(13, 92, 182)'
                        colorbutton='#000'
                    />
                </Col>

                <Col span={6} style={{ display: 'flex', gap: '20px' }}>
                    <WrapperHeaderAccount>
                        <UserOutlined style={{ fontSize: '30px' }} />
                        {user?.name ? (
                            <div style={{ fontSize: '16px' }}>Xin chào, {user.name}</div>
                        ) : (
                            <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                <span>Đăng nhập/Đăng kí</span>
                                <div>
                                    <span>Tài khoản</span>
                                    <CaretDownOutlined />
                                </div>
                            </div>
                        )}
                    </WrapperHeaderAccount>

                    <WrapperHeaderAccount>
                        <Badge count={4} size="small">
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                        </Badge>

                        <span>Giỏ hàng</span>
                    </WrapperHeaderAccount>
                </Col>
            </WrapperHeader>
        </div >
    )
}

export default HeaderComponent