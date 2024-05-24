import React, { useEffect, useState } from 'react'
import { Button, Form, Image, Input, InputNumber, Modal, Popconfirm, Select, Space, Table, Upload, message } from 'antd';
import Loading from '../Loading/Loading'
import { brandService } from '../../services/BrandService';
import { categoryService } from '../../services/CategoryService';
import { productService } from '../../services/ProductService';
import { getBase64 } from '../../utils'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { imageService } from '../../services/ImageService';
import { serverConfig } from '../../const/serverConfig';

const AdminProduct = () => {
  const [brands, setBrands] = useState([]);
  const [brandObj, setBrandObj] = useState({});
  const [categories, setCategory] = useState([]);
  const [categoryObj, setCategoryObj] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoadingProduct, setLoadingProduct] = useState(false);
  const [file, setFile] = useState(null)
  const [descriptionCkData, setDescriptionCkData] = useState('');
  const [descriptionCkDataUpdate, setDescriptionCkDataUpdate] = useState('');
  const [fileListUpdate, setFileListUpdate] = useState([])

  const fetchBrands = async () => {
    try {
      const response = await brandService.getAllBrand();
      const brandObject = {};
      response.data.forEach(brand => {
        brandObject[brand._id] = brand.name; // Tạo một đối tượng từ danh sách thương hiệu, key là ID, value là tên
      });
      setBrandObj(brandObject)
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategory();
      const categoryObject = {};
      response.data.forEach(category => {
        categoryObject[category._id] = category.name; // Tạo một đối tượng từ danh sách thương hiệu, key là ID, value là tên
      });
      setCategoryObj(categoryObject)
      setCategory(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoadingProduct(true)
      const response = await productService.getAllProduct();
      setProducts(response.data.map((product, index) => ({ ...product, index: index + 1, key: product._id })));
      setLoadingProduct(false)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProducts();
  }, []);

  const { Option } = Select;
  const [form] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
    form.setFieldsValue({
      description: undefined
    })
  }

  const handleCancelUpdate = () => {
    setIsModalOpenUpdate(false)
  }

  const onFinish = async (value) => {
    const data = {
      name: value.name,
      description: descriptionCkData,
      price: value.price,
      stock: value.stock,
      category: value.category,
      brand: value.brand,
      image: file
    }
    await productService.createProduct(data)
      .then(() => fetchProducts())
    setIsModalOpen(false)
    form.resetFields()
    message.success("Thêm thành công")
  }

  const onFinishUpdate = async (value) => {
    const data = {
      name: value.name,
      description: descriptionCkDataUpdate,
      price: value.price,
      stock: value.stock,
      category: value.category,
      brand: value.brand,
      image: file
    }
    setIsModalOpenUpdate(false)
    await productService.updateProduct(value.id, data)
      .then(() => fetchProducts())
    message.success("Cập nhật thành công")
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
      await productService.deleteProduct(id)
    }
    const index = rowSelectedKeys.length - 1
    await productService.deleteProduct(rowSelectedKeys[index])
      .then(() => fetchProducts())

    message.success("Xoá thành công")
    setRowSelectedKeys([])
  }

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setDescriptionCkData(data);
  }

  const handleEditorChangeUpdate = (event, editor) => {
    const data = editor.getData();
    setDescriptionCkDataUpdate(data);
  }

  // upload image
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const [previewOpenUpdate, setPreviewOpenUpdate] = useState(false);
  const [previewImageUpdate, setPreviewImageUpdate] = useState('');

  const handlePreviewUpdate = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImageUpdate(file.url || file.preview);
    setPreviewOpenUpdate(true);
  };

  //lấy file
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const onChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onChangeUpdate = ({ fileList: newFileList }) => setFileListUpdate(newFileList);

  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('file', file);

    await imageService.uploadImage(formData)
      .then(response => {
        setFile(response.path); // Lưu đường dẫn tệp tin trả về từ server
        onSuccess(response, file);
      })
      .catch(error => {
        onError(error);
      });
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      filters: categories.map(category => ({ text: category.name, value: category._id })),
      onFilter: (value, record) => record.category.startsWith(value),
      filterSearch: true,
      render: category => categoryObj[category],
    },
    {
      title: 'Hãng',
      dataIndex: 'brand',
      key: 'brand',
      filters: brands.map(brand => ({ text: brand.name, value: brand._id })),
      onFilter: (value, record) => record.brand === value,
      filterSearch: true,
      render: brand => brandObj[brand],
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số lượng',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image src={`${serverConfig.server}/uploads/${image}`} width={100} />
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />}
            onClick={async () => {
              const res = await productService.getProduct(record.key)
              formUpdate.setFieldsValue({
                id: record.key,
                name: res.data.name,
                description: res.data.description,
                category: res.data.category,
                brand: res.data.brand,
                stock: res.data.stock,
                price: res.data.price,
                image: res.data.image
              })

              const fileImage = {
                uid: '-1',
                name: res.data.image,
                status: 'done',
                url: `${serverConfig.server}/uploads/${res.data.image}`,
              };
              const newFileList = []
              newFileList.push(fileImage)
              setFileListUpdate(newFileList)

              setDescriptionCkDataUpdate(res.data.description)
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
      <h1 style={{ color: '#000', fontSize: '18px' }}>Quản lý sản phẩm</h1>
      <Button style={{ marginRight: '20px' }} onClick={() => setIsModalOpen(true)}>Thêm sản phẩm</Button>
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa các sản phẩm đã chọn?"
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
          Xóa các sản phẩm được chọn
        </Button>
      </Popconfirm>
      <div style={{ marginTop: '20px' }}>
        <Loading isLoading={isLoadingProduct} >
          <Table
            dataSource={products}
            columns={columns}
            rowSelection={rowSelection}
            pagination={{
              position: 'bottom',
              total: products.length, // Tổng số items
              showSizeChanger: true, // Hiển thị chọn pageSize
              pageSizeOptions: ['5', '10', '20'] // Các lựa chọn pageSize
            }}
          />
        </Loading>
      </div>
      <Modal title='Thêm sản phẩm' open={isModalOpen} onCancel={handleCancel} footer={null} width={600} style={{ top: '20px' }} >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[
              {
                required: true,
                message: 'Hãy nhập tên sản phẩm!',
              },
            ]}
          >
            <Input name='name' />
          </Form.Item>

          <Form.Item
            label="Loại sản phẩm"
            name="category"
            rules={[
              {
                required: true,
                message: 'Hãy chọn loại sản phẩm!',
              },
            ]}
          >
            <Select name='category' >
              {categories.map(category => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Hãng"
            name="brand"
            rules={[
              {
                required: true,
                message: 'Hãy chọn hãng sản phẩm!',
              },
            ]}
          >
            <Select name='brand' >
              {brands.map(brand => (
                <Option key={brand._id} value={brand._id}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
          >
            <CKEditor editor={ClassicEditor} name='description' data={descriptionCkData} onChange={handleEditorChange} />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[
              {
                required: true,
                message: 'Hãy nhập giá sản phẩm!',
              },
            ]}
          >
            <InputNumber name='price' />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="stock"
            rules={[
              {
                required: true,
                message: 'Hãy nhập số lượng sản phẩm!',
              },
            ]}
          >
            <InputNumber name='stock' />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="image"
          >
            <Upload
              listType="picture-card"
              customRequest={customRequest}
              onChange={onChange}
              onPreview={handlePreview}
              // onChange={handleOnChangeImage}
              maxCount={1}
            >
              {uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: 'none',
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
              />
            )}

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

      <Modal title='Sửa sản phẩm' open={isModalOpenUpdate} onCancel={handleCancelUpdate} footer={null} width={600} style={{ top: '20px' }} >
        <Form
          name="basic2"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          autoComplete="off"
          form={formUpdate}
          onFinish={onFinishUpdate}
        >
          <Form.Item
            label="ID"
            name="id"
          >
            <Input name='id' disabled />
          </Form.Item>

          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[
              {
                required: true,
                message: 'Hãy nhập tên sản phẩm!',
              },
            ]}
          >
            <Input name='name' />
          </Form.Item>

          <Form.Item
            label="Loại sản phẩm"
            name="category"
            rules={[
              {
                required: true,
                message: 'Hãy chọn loại sản phẩm!',
              },
            ]}
          >
            <Select name='category' >
              {categories.map(category => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Hãng"
            name="brand"
            rules={[
              {
                required: true,
                message: 'Hãy chọn hãng sản phẩm!',
              },
            ]}
          >
            <Select name='brand' >
              {brands.map(brand => (
                <Option key={brand._id} value={brand._id}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
          >
            <CKEditor editor={ClassicEditor} data={descriptionCkDataUpdate} onChange={handleEditorChangeUpdate} name='description' />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[
              {
                required: true,
                message: 'Hãy nhập giá sản phẩm!',
              },
            ]}
          >
            <InputNumber name='price' />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="stock"
            rules={[
              {
                required: true,
                message: 'Hãy nhập số lượng sản phẩm!',
              },
            ]}
          >
            <InputNumber name='stock' />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="image"
          >
            <Upload
              listType="picture-card"
              onPreview={handlePreviewUpdate}
              customRequest={customRequest}
              onChange={onChangeUpdate}
              maxCount={1}
              fileList={fileListUpdate}
            >
              {uploadButton}
            </Upload>
            <Image
              wrapperStyle={{
                display: 'none',
              }}
              preview={{
                visible: previewOpenUpdate,
                onVisibleChange: (visible) => setPreviewOpenUpdate(visible),
                afterOpenChange: (visible) => !visible && setPreviewImageUpdate(''),
              }}
              src={previewImageUpdate}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminProduct