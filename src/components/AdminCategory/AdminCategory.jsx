import React, { useState, useEffect, useRef } from 'react';
import { categoryService } from '../../services/CategoryService';
import { Button, Form, Input, Modal, Popconfirm, Space, Table, message } from 'antd';
import Loading from '../Loading/Loading';
import { useMutationHook } from '../../hooks/useMutationHook';
import InputComponent from '../InputComponent/InputComponent';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isLoadingCategory, setLoadingCategory] = useState(false);
  const [id, setId] = useState('')
  const [stateCategory, setStateCategory] = useState({
    name: ''
  });
  const [stateCategoryDetail, setStateCategoryDetail] = useState({
    name: ''
  });

  const handleOnChange = (value, name) => {
    setStateCategory({
      ...stateCategory,
      [name]: value
    })
  }

  const handleOnChangeDetail = (value, name) => {
    setStateCategoryDetail({
      ...stateCategoryDetail,
      [name]: value
    })
  }

  const mutationDelete = useMutationHook(
    (ids) => {
      ids.forEach((id) => {
        categoryService.deleteCategory(id)
      })
      fetchCategories()
    }
  )
  const { isLoading: isDelete } = mutationDelete

  const fetchCategories = async () => {
    try {
      setLoadingCategory(true)
      const response = await categoryService.getAllCategory();
      setCategories(response.data.map((category, index) => ({ ...category, index: index + 1, key: category._id })));
      setLoadingCategory(false)
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [isDelete]);

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
    await categoryService.createCategory(stateCategory)
      .then(() => fetchCategories())
    setIsModalOpen(false)
    message.success("Thêm thành công")
  }

  const onFinishUpdate = async () => {
    await categoryService.updateCategory(id, stateCategoryDetail)
      .then(() => fetchCategories())
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

  const handleDeleteSelected = () => {
    mutationDelete.mutate(rowSelectedKeys)
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
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button> */}
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
      title: 'Tên danh mục',
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
              const res = await categoryService.getCategory(record.key)
              formUpdate.setFieldsValue({
                id: record.key,
                name: res.data.name
              })
              setStateCategoryDetail({
                ...stateCategoryDetail,
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
      <h1 style={{ color: '#000', fontSize: '18px' }}>Quản lý danh mục</h1>
      <Button style={{ marginRight: '20px' }} onClick={() => setIsModalOpen(true)}>Thêm danh mục</Button>
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa các danh mục được chọn?"
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
          Xóa các danh mục được chọn
        </Button>
      </Popconfirm>
      <div style={{ marginTop: '20px' }}>
        <Loading isLoading={isLoadingCategory} >
          <Table
            dataSource={categories}
            columns={columns}
            rowSelection={rowSelection}
            pagination={{ 
              position: 'bottom',
              total: categories.length, // Tổng số items
              showSizeChanger: true, // Hiển thị chọn pageSize
              pageSizeOptions: ['5', '10', '20'] // Các lựa chọn pageSize
            }}
          />
        </Loading>
      </div>
      <Modal title='Thêm danh mục' open={isModalOpen} onCancel={handleCancel} footer={null} >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[
              {
                required: true,
                message: 'Hãy nhập tên danh mục!',
              },
            ]}
          >
            <InputComponent name='name' value={stateCategory.name} onChange={(e) => handleOnChange(e.target.value, 'name')} />
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

      <Modal title='Sửa danh mục' open={isModalOpenUpdate} onCancel={handleCancelUpdate} footer={null} >
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
            label="Tên danh mục"
            name="name"
            rules={[
              {
                required: true,
                message: 'Hãy nhập tên danh mục!',
              },
            ]}
          >
            <InputComponent name='name' value={stateCategoryDetail.name} onChange={(e) => handleOnChangeDetail(e.target.value, 'name')} />
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

export default AdminCategory