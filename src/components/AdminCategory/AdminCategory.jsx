import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/CategoryService';
import { Button, Form, Modal, message } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import Loading from '../Loading/Loading';
import { useMutationHook } from '../../hooks/useMutationHook';
import InputComponent from '../InputComponent/InputComponent';

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isLoadingCategory, setLoadingCategory] = useState(false);
  const [stateCategory, setStateCategory] = useState({
    name: ''
  });

  const handleOnChange = (value, name) => {
    setStateCategory({
      ...stateCategory,
      [name]: value
    })
  }

  const mutation = useMutationHook(
    (data) => {
      categoryService.createCategory(data)
    }
  )
  const { data, isLoading, isSuccess, isError } = mutation

  const fetchCategories = async () => {
    try {
      setLoadingCategory(true)
      const response = await categoryService.getAllCategory();
      setCategories(response.data.map((category, index) => ({ ...category, key: index + 1 })));
      setLoadingCategory(false)
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [isLoading]);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
    setStateCategory({
      ...stateCategory,
      name: ''
    })
  }

  const onFinish = () => {
    mutation.mutate(stateCategory)
    setIsModalOpen(false)
    message.success("Thêm thành công")
    fetchCategories()
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <div>
      <h1 style={{ color: '#000', fontSize: '18px' }}>Quản lý danh mục</h1>
      <Button onClick={() => setIsModalOpen(true)}>Add Category</Button>
      <div style={{ marginTop: '20px' }}>
        <Loading isLoading={isLoadingCategory} >
          <TableComponent data={categories} columns={columns} />
        </Loading>
      </div>
      <Modal title='Thêm danh mục' open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="on"
          form={form}
        // initialValues={{name: 'as'}}
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
    </div>
  )
}

export default AdminCategory