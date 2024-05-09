import React, { useState, useEffect } from 'react';
import { userService } from '../../services/UserService';
import { Button, Form, Input, Modal, Popconfirm, Select, Space, Table, message } from 'antd';
import Loading from '../Loading/Loading';
import InputComponent from '../InputComponent/InputComponent';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const AdminUser = () => {
  const access_token = JSON.parse(localStorage.getItem('access_token'))
  const { Option } = Select;
  const [users, setUsers] = useState([]);
  const [isLoadingUser, setLoadingUser] = useState(false);
  const [id, setId] = useState('')
  const [stateUser, setStateUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [stateUserDetail, setStateUserDetail] = useState({
    name: '',
    email: '',
    isAdmin: false
  });

  const handleOnChange = (value, name) => {
    setStateUser({
      ...stateUser,
      [name]: value
    })
  }

  const handleOnChangeDetail = (value, name) => {
    setStateUserDetail({
      ...stateUserDetail,
      [name]: value
    })
  }

  const fetchUsers = async () => {
    try {
      setLoadingUser(true)
      const response = await userService.getAllUser();
      setUsers(response.data.map((user, index) => ({ ...user, index: index + 1, key: user._id })));
      setLoadingUser(false)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const [form] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const handleCancelUpdate = () => {
    setIsModalOpenUpdate(false)
  }

  const onFinish = async () => {
    await userService.createUser(stateUser)
      .then(() => fetchUsers())
    setIsModalOpen(false)
    message.success("Thêm thành công")
  }

  const onFinishUpdate = async () => {
    await userService.updateUser(id, stateUserDetail, access_token)
      .then(() => fetchUsers())
    setIsModalOpenUpdate(false)
    message.success("Sửa thành công")
  }

  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  const rowSelection = {
    rowSelectedKeys,
    onChange: (selectedKeys) => {
      setRowSelectedKeys(selectedKeys);
    },
  };

  const handleDeleteSelected = async () => {
    for (let index = 0; index < rowSelectedKeys.length - 1; index++) {
      const id = rowSelectedKeys[index];
      await userService.deleteUser(id)
    }
    const index = rowSelectedKeys.length - 1
    await userService.deleteUser(rowSelectedKeys[index], access_token)
      .then(() => fetchUsers())

    message.success("Xoá thành công")
    setRowSelectedKeys([])
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Quyền',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      render: isAdmin => isAdmin ? 'Admin' : 'User'
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />}
            onClick={async () => {
              const res = await userService.getUser(record.key)
              formUpdate.setFieldsValue({
                id: record.key,
                name: res.data.name,
                email: res.data.email,
                isAdmin: res.data.isAdmin
              })
              setStateUserDetail({
                ...stateUserDetail,
                name: res.data.name,
                email: res.data.email,
                isAdmin: res.data.isAdmin
              })
              setId(record.key)
              setIsModalOpenUpdate(true)
            }}
          >
            Sửa
          </Button>
        </Space>
      )
    }
  ];

  console.log(access_token)

  return (
    <div>
      <h1 style={{ color: '#000', fontSize: '18px' }}>Quản lý người dùng</h1>
      <Button style={{ marginRight: '20px' }} onClick={() => setIsModalOpen(true)}>Thêm người dùng</Button>
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa các người dùng được chọn?"
        onConfirm={handleDeleteSelected}
        okText="Yes"
        cancelText="No"
        disabled={rowSelectedKeys.length === 0}
      >
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          disabled={rowSelectedKeys.length === 0}
          danger
        >
          Xóa các người dùng được chọn
        </Button>
      </Popconfirm>
      <div style={{ marginTop: '20px' }}>
        <Loading isLoading={isLoadingUser} >
          <Table
            dataSource={users}
            columns={columns}
            rowSelection={rowSelection}
            pagination={{ 
              position: 'bottom',
              total: users.length, // Tổng số items
              showSizeChanger: true, // Hiển thị chọn pageSize
              pageSizeOptions: ['5', '10', '20'] // Các lựa chọn pageSize
            }}
          />
        </Loading>
      </div>
      <Modal title='Thêm người dùng' open={isModalOpen} onCancel={handleCancel} footer={null} >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Tên người dùng"
            name="name"
            rules={[
              {
                required: true,
                message: 'Hãy nhập tên người dùng!',
              },
            ]}
          >
            <InputComponent name='name' value={stateUser.name} onChange={(e) => handleOnChange(e.target.value, 'name')} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Hãy nhập email người dùng!',
              },
            ]}
          >
            <InputComponent name='email' value={stateUser.email} onChange={(e) => handleOnChange(e.target.value, 'email')} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: 'Hãy nhập mật khẩu người dùng!',
              },
            ]}
          >
            <Input type='password' name='password' value={stateUser.password} onChange={(e) => handleOnChange(e.target.value, 'password')} />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Hãy nhập mật khẩu người dùng!',
              },
            ]}
          >
            <Input type='password' name='confirmPassword' value={stateUser.confirmPassword} onChange={(e) => handleOnChange(e.target.value, 'confirmPassword')} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title='Sửa người dùng' open={isModalOpenUpdate} onCancel={handleCancelUpdate} footer={null} >
        <Form
          name="basic2"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          autoComplete="off"
          form={formUpdate}
        >
          <Form.Item
            label="ID"
            name="id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input name='id' value={id} disabled />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input name='email' disabled />
          </Form.Item>

          <Form.Item
            label="Tên người dùng"
            name="name"
            rules={[
              {
                required: true,
                message: 'Hãy nhập tên người dùng!',
              },
            ]}
          >
            <InputComponent name='name' value={stateUserDetail.name} onChange={(e) => handleOnChangeDetail(e.target.value, 'name')} />
          </Form.Item>

          <Form.Item
            label="Quyền"
            name="isAdmin"
            rules={[
              {
                required: true,
                message: 'Hãy nhập tên người dùng!',
              },
            ]}
          >
            <Select name='isAdmin' onChange={(value) => handleOnChangeDetail(value, 'isAdmin')} value={stateUserDetail.isAdmin} >
              <Option key={false} value={false}>
                User
              </Option>
              <Option key={true} value={true}>
                Admin
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={onFinishUpdate}>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminUser