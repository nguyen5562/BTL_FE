import React, { useEffect, useState } from 'react'
import TableComponent from '../TableComponent/TableComponent'
import { Button, Form, Image, Input, InputNumber, Modal, Select, Upload, message } from 'antd';
import InputComponent from '../InputComponent/InputComponent';
import Loading from '../Loading/Loading'
import { brandService } from '../../services/BrandService';
import { categoryService } from '../../services/CategoryService';
import { productService } from '../../services/ProductService';
import { getBase64 } from '../../utils'
import { PlusOutlined } from '@ant-design/icons';
import { useMutationHook } from '../../hooks/useMutationHook';

const AdminProduct = () => {
  const [brands, setBrands] = useState([]);
  const [brandObj, setBrandObj] = useState({});
  const [categories, setCategory] = useState([]);
  const [categoryObj, setCategoryObj] = useState({});
  const [products, setProducts] = useState([]);
  const [stateProduct, setStateProduct] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    stock: '',
    price: '',
    image: ''
  })

  const mutation = useMutationHook(
    (data) => {
      productService.createProduct(data)
    }
  )
  const { data, isLoading, isSuccess, isError } = mutation

  const handleOnChange = (value, name) => {
    setStateProduct({
      ...stateProduct,
      [name]: value
    })
  }

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
      const response = await productService.getAllProduct();
      setProducts(response.data.map((product, index) => ({ ...product, key: index })));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProducts();
  }, [isSuccess]);

  const { Option } = Select;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onFinish = () => {
    mutation.mutate(stateProduct)
    setIsModalOpen(false)
    if (isSuccess) {
      message.success("Thêm thành công")
    } else {
      message.error("Thêm thất bại")
    }
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

  const handleOnChangeImage = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    console.log(file.originFileObj)
    setStateProduct({
      ...stateProduct,
      image: file.preview
    })
  }

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
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
    },
  ];

  return (
    <div>
      <h1 style={{ color: '#000', fontSize: '18px' }}>Quản lý sản phẩm</h1>
      <Button onClick={() => setIsModalOpen(true)}>Add Product</Button>
      <div style={{ marginTop: '20px' }}>
        <TableComponent data={products} columns={columns} />
      </div>
      <Modal title='Thêm sản phẩm' open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="on"
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
              <InputComponent name='name' value={stateProduct.name} onChange={(e) => handleOnChange(e.target.value, 'name')} />
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
              <Select name='category' onChange={(value) => handleOnChange(value, 'category')} value={stateProduct.category} >
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
              <Select name='brand' onChange={(value) => handleOnChange(value, 'brand')} value={stateProduct.brand} >
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
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập mô tả sản phẩm!',
                },
              ]}
            >
              <Input.TextArea name='description' value={stateProduct.description} onChange={(e) => handleOnChange(e.target.value, 'description')} />
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
              <InputNumber name='price' value={stateProduct.price} onChange={(value) => handleOnChange(value, 'price')} />
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
              <InputNumber name='stock' value={stateProduct.stock} onChange={(value) => handleOnChange(value, 'stock')} />
            </Form.Item>

            <Form.Item
              label="Hình ảnh"
              name="image"
            >
              <Upload
                listType="picture-card"
                onPreview={handlePreview}
                onChange={handleOnChangeImage}
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
        </Loading>

      </Modal>
    </div>
  )
}

export default AdminProduct