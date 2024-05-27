import React, { useState, useEffect, useRef } from 'react';
import { brandService } from '../../services/BrandService';
import { Button, Form, Input, Modal, Popconfirm, Space, Table, message } from 'antd';
import Loading from '../Loading/Loading';
import InputComponent from '../InputComponent/InputComponent';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';

const AdminBrand = () => {
  const [brands, setBrands] = useState([]);
  const [isLoadingBrand, setLoadingBrand] = useState(false);
  const [id, setId] = useState('')
  const [stateBrand, setStateBrand] = useState({
    name: ''
  });
  const [stateBrandDetail, setStateBrandDetail] = useState({
    name: ''
  });

  const handleOnChange = (value, name) => {
    setStateBrand({
      ...stateBrand,
      [name]: value
    })
  }

  const handleOnChangeDetail = (value, name) => {
    setStateBrandDetail({
      ...stateBrandDetail,
      [name]: value
    })
  }

  const fetchBrands = async () => {
    try {
      setLoadingBrand(true)
      const response = await brandService.getAllBrand();
      setBrands(response.data.map((brand, index) => ({ ...brand, index: index + 1, key: brand._id })));
      setLoadingBrand(false)
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const [form] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleCancelUpdate = () => {
    setIsModalOpenUpdate(false)
  }

  const onFinish = async () => {
    await brandService.createBrand(stateBrand)
      .then(() => fetchBrands())
    setIsModalOpen(false)
    form.resetFields()
    message.success("Thêm thành công")
  }

  const onFinishUpdate = async () => {
    await brandService.updateBrand(id, stateBrandDetail)
      .then(() => fetchBrands())
    setIsModalOpenUpdate(false)
    formUpdate.resetFields()
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
      await brandService.deleteBrand(id)
    }
    const index = rowSelectedKeys.length - 1
    await brandService.deleteBrand(rowSelectedKeys[index])
      .then(() => fetchBrands())

    message.success("Xoá thành công")
    setRowSelectedKeys([])
  }

  // search
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    }
  });

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Tên hãng',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />}
            onClick={async () => {
              const res = await brandService.getBrand(record.key)
              formUpdate.setFieldsValue({
                id: record.key,
                name: res.data.name
              })
              setStateBrandDetail({
                ...stateBrandDetail,
                name: res.data.name
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

  return (
    <div>
      <h1 style={{ color: '#000', fontSize: '18px' }}>Quản lý hãng</h1>
      <Button style={{ marginRight: '20px' }} onClick={() => setIsModalOpen(true)}>Thêm hãng</Button>
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa các hãng đã chọn?"
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
          Xóa các hãng được chọn
        </Button>
      </Popconfirm>
      <div style={{ marginTop: '20px' }}>
        <Loading isLoading={isLoadingBrand} >
          <Table
            dataSource={brands}
            columns={columns}
            rowSelection={rowSelection}
            pagination={{ 
              position: 'bottom',
              total: brands.length, // Tổng số items
              showSizeChanger: true, // Hiển thị chọn pageSize
              pageSizeOptions: ['5', '10', '20'] // Các lựa chọn pageSize
            }}
          />
        </Loading>
      </div>
      <Modal title='Thêm hãng' open={isModalOpen} onCancel={handleCancel} footer={null} >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Tên hãng"
            name="name"
            rules={[
              {
                required: true,
                message: 'Hãy nhập tên hãng!',
              },
            ]}
          >
            <InputComponent name='name' value={stateBrand.name} onChange={(e) => handleOnChange(e.target.value, 'name')} />
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

      <Modal title='Sửa hãng' open={isModalOpenUpdate} onCancel={handleCancelUpdate} footer={null} >
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
            label="Tên hãng"
            name="name"
            rules={[
              {
                required: true,
                message: 'Hãy nhập tên hãng!',
              },
            ]}
          >
            <InputComponent name='name' value={stateBrandDetail.name} onChange={(e) => handleOnChangeDetail(e.target.value, 'name')} />
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

export default AdminBrand