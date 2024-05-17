import React, { useState } from "react";
import { Badge, Col, Popover } from "antd";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperContentPopup } from "./style";
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../redux/slides/userSlide";
import { searchProduct } from "../../redux/slides/productSlide";
import Loading from "../Loading/Loading";

const HeaderComponent = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)

    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }

    const content = (
        <div>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Đi đến trang quản lý</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
            <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
        </div>
    );

    const handleClickNavigate = (type) => {
        if (type === 'admin') {
            navigate('/admin')
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

    const handleCart = () => {
        navigate('/order')
    }

    // Search
    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
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
                        onChange={onSearch}
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
                        <Badge count={order?.orderItems?.length} size="small">
                            <ShoppingCartOutlined onClick={handleCart} style={{ fontSize: '30px', color: '#fff' }} />
                        </Badge>

                        <div style={{ fontSize: '13px' }}>Giỏ hàng</div>
                    </WrapperHeaderAccount>
                </Col>
            </WrapperHeader>
        </div >
    )
}

export default HeaderComponent