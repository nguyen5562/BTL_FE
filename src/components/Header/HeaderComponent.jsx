import React, { useState } from "react";
import { Badge, Col, Popover } from "antd";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperContentPopup } from "./style";
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../Loading/Loading";

const HeaderComponent = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }

    const content = (
        <div>
            <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
            <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
        </div>
    );

    const handleClickNavigate = (type) => {
        if (type === 'profile') {
            navigate('/profile-user')
        } else if (type === 'admin') {
            navigate('/system/admin')
        } else if (type === 'my-order') {
            navigate('/my-order', {
                state: {
                    id: user?.id,
                    token: user?.access_token
                }
            })
        } else {
            handleLogout()
        }
        setIsOpenPopup(false)
    }

    const handleLogout = async () => {
        setLoading(true)
        localStorage.clear()
        dispatch(resetUser())
        setLoading(false)
    }

    return (
        <div>
            <WrapperHeader>
                <Col span={5}>
                    <WrapperTextHeader onClick={() => {
                        navigate('/')
                    }}>
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
                    <Loading isLoading={isLoading}>
                        <WrapperHeaderAccount>
                            <UserOutlined style={{ fontSize: '30px' }} />
                            {user?.name ? (
                                <>
                                    <Popover content={content} trigger="click" open={isOpenPopup}>
                                        <div style={{ cursor: 'pointer', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '13px' }} onClick={() => setIsOpenPopup((prev) => !prev)}>Xin chào, {user?.name}</div>
                                    </Popover>
                                </>
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
                    </Loading>

                    <WrapperHeaderAccount>
                        <Badge count={4} size="small">
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                        </Badge>

                        <div style={{ fontSize: '13px' }}>Giỏ hàng</div>
                    </WrapperHeaderAccount>
                </Col>
            </WrapperHeader>
        </div >
    )
}

export default HeaderComponent