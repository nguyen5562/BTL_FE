import { Layout, Menu, Popover, theme } from 'antd';
import React, { useState } from 'react'
import { getItem } from '../../utils';
import { UserOutlined, ShoppingCartOutlined, ProductOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminOrder from '../../components/AdminOrder/AdminOrder';
import AdminCategory from '../../components/AdminCategory/AdminCategory';
import AdminBrand from '../../components/AdminBrand/AdminBrand';
import '../AdminPage/AdminPage.css'
import { useNavigate } from 'react-router-dom';
import { resetUser } from '../../redux/slides/userSlide';

const AdminPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const user = useSelector((state) => state?.user)
  const [keySelected, setKeySelected] = useState('users');
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpenPopup, setIsOpenPopup] = useState(false)

  const items = [
    getItem('Người dùng', 'users', <UserOutlined />),
    getItem('Danh mục', 'categories'),
    getItem('Hãng', 'brands'),
    getItem('Sản phẩm', 'products', <ProductOutlined />),
    getItem('Đơn hàng', 'orders', <ShoppingCartOutlined />),
  ];

  const renderPage = (key) => {
    switch (key) {
      case 'users':
        return (
          <AdminUser />
        )
      case 'products':
        return (
          <AdminProduct />
        )
      case 'orders':
        return (
          <AdminOrder />
        )
      case 'categories':
        return (
          <AdminCategory />
        )
      case 'brands':
        return (
          <AdminBrand />
        )
      default:
        return <></>
    }
  }

  const handleOnCLick = ({ key }) => {
    setKeySelected(key)
  }

  const { Header, Content, Footer, Sider } = Layout;

  const content = (
    <div>
      {user?.isAdmin && (
        <p className='content' onClick={() => handleClickNavigate('admin')}>Đi đến trang chủ</p>
      )}
      <p className='content' onClick={() => handleClickNavigate()}>Đăng xuất</p>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === 'admin') {
      navigate('/')
    } else {
      handleLogout()
      navigate('/')
    }
    setIsOpenPopup(false)
  }

  const handleLogout = async () => {
    localStorage.clear()
    dispatch(resetUser())
  }

  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical">hsdhhfds</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['users']} items={items} onClick={handleOnCLick} />
      </Sider>
      <Layout style={{
        marginLeft: 200,
      }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer
          }}
        >
          <div style={{ display: 'flex', gap: '12px', float: 'right', marginRight: '30px' }}>
            <UserOutlined style={{ fontSize: '30px' }} />
            <Popover content={content} trigger="click" open={isOpenPopup}>
              <div style={{ cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '16px' }} onClick={() => setIsOpenPopup((prev) => !prev)}>Xin chào, {user?.name}</div>
            </Popover>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderPage(keySelected)}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminPage