import React, { useState } from "react";
import { Badge, Button, Col, Input, Popover } from "antd";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperContentPopup } from "./style";
import { CaretDownOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../redux/slides/userSlide";
import { searchProduct } from "../../redux/slides/productSlide";
import Loading from "../Loading/Loading";
import { removeAllOrderProduct } from "../../redux/slides/orderSlide";

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
        dispatch(removeAllOrderProduct())
        setLoading(false)
    }

    const handleCart = () => {
        navigate('/order')
    }

    // Search
    const onSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = () => {
        dispatch(searchProduct(search))
        navigate('/')
    }

    console.log(search)

    return (
        <WrapperHeader>
            <Col span={5}>
                <WrapperTextHeader onClick={() => {
                    navigate('/')
                }}>
                    MTA Store
                </WrapperTextHeader>
            </Col>

            <Col span={13}>
                <div style={{ display: "flex" }}>
                    <Input
                        size='large'
                        placeholder="Tìm sản phẩm"
                        style={{ backgroundColor: '#fff' }}
                        onChange={onSearch}
                        value={search}
                    />
                    <Button
                        size='large'
                        style={{ background: 'rgb(13, 92, 182)', border: 'none', color: '#000' }}
                        icon={<SearchOutlined style={{ color: '#000' }} />}
                        onClick={handleSearch}
                    > <span>Tìm kiếm</span> </Button>
                </div>
            </Col>

            <Col span={6} style={{ display: 'flex', gap: '20px' }}>
                <Loading isLoading={isLoading}>
                    <WrapperHeaderAccount>
                        <UserOutlined style={{ fontSize: '30px' }} />
                        {user?.name ? (
                            <Popover content={content} trigger="click" open={isOpenPopup}>
                                <div style={{ cursor: 'pointer', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '13px' }} onClick={() => setIsOpenPopup((prev) => !prev)}>Xin chào, {user?.name}</div>
                            </Popover>
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
    )
}

export default HeaderComponent