import React, { useState, useEffect } from 'react';
import { brandService } from '../../services/BrandService';
import { Button, Form, Input, Modal, Popconfirm, Space, message } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import Loading from '../Loading/Loading';
import { useMutationHook } from '../../hooks/useMutationHook';
import InputComponent from '../InputComponent/InputComponent';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const AdminBrand = () => {
  const [brands, setBrands] = useState([]);
  const [isLoadingBrand, setLoadingBrand] = useState(false);
  const [stateBrand, setStateBrand] = useState({
    name: ''
  });

  const handleOnChange = (value, name) => {
    setStateBrand({
      ...stateBrand,
      [name]: value
    })
  }

  const mutation = useMutationHook(
    (data) => {
      brandService.createBrand(data)
    }
  )
  const { data, isLoading, isSuccess, isError } = mutation

  const fetchBrands = async () => {
    try {
      setLoadingBrand(true)
      const response = await brandService.getAllBrand();
      setBrands(response.data.map((brand, index) => ({ ...brand, key: index + 1 })));
      setLoadingBrand(false)
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [isLoading]);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
    setStateBrand({
      ...stateBrand,
      name: ''
    })
  }

  const onFinish = async () => {
    mutation.mutate(stateBrand)
    setIsModalOpen(false)
    message.success("Thêm thành công")
    fetchBrands()
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Tên hãng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />}
          // onClick={() => handleEdit(record.id)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
            // onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" icon={<DeleteOutlined />} danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  console.log(stateBrand)

  return (
    <div>
      <h1 style={{ color: '#000', fontSize: '18px' }}>Quản lý hãng</h1>
      <Button onClick={() => setIsModalOpen(true)}>Add Brand</Button>
      <div style={{ marginTop: '20px' }}>
        <Loading isLoading={isLoadingBrand} >
          <TableComponent data={brands} columns={columns} />
        </Loading>
      </div>
      <Modal title='Thêm hãng' open={isModalOpen} onCancel={handleCancel} footer={null} >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="on"
          form={form}
        // initialValues={{ name: "asssssss" }}
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
    </div>
  )
}

export default AdminBrand