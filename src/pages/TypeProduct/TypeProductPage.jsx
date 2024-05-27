import React, { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Button, Checkbox, Col, Pagination, Radio, Row } from "antd";
import { WrapperContent, WrapperNavbar, WrapperProducts } from "./style";
import { useLocation } from "react-router-dom";
import { productService } from "../../services/ProductService";
import { brandService } from "../../services/BrandService";
import Loading from "../../components/Loading/Loading";

const TypeProductPage = () => {
    const location = useLocation();
    const { state } = location;
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [brands, setBrands] = useState([])
    const [filterBrand, setFilterBrand] = useState([])
    const [filterPrice, setFilterPrice] = useState({
        priceMin: 0,
        priceMax: 0
    })
    const [filterProducts, setFilterProducts] = useState([])

    const handleCheckbox = (checkedValues) => {
        setFilterBrand(checkedValues);
    }

    const handleRadio = (e) => {
        const value = e.target.value;
        let priceMin = 0;
        let priceMax = 0;

        if (value === 'a') {
            priceMin = 0;
            priceMax = 1000000;
        } else if (value === 'b') {
            priceMin = 1000000;
            priceMax = 10000000;
        } else if (value === 'c') {
            priceMin = 10000000;
            priceMax = Number.POSITIVE_INFINITY;
        }

        setFilterPrice({ priceMin, priceMax });
    };

    const fetchBrand = async () => {
        const res = await brandService.getAllBrand()
        setBrands(res.data)
    }

    const fetchProductByCategory = async () => {
        const res = await productService.getAllProductCategory(state.id)
        setProducts(res.data)
        setFilterProducts(res.data)
    }

    useEffect(() => {
        setIsLoading(true)
        fetchBrand()
        fetchProductByCategory()
        setIsLoading(false)
    }, [location])

    const filterProduct = () => {
        setIsLoading(true)
        let data = products

        if (filterPrice.priceMin !== 0 || filterPrice.priceMax !== 0) {
            data = data.filter(product => product.price >= filterPrice.priceMin && product.price <= filterPrice.priceMax)
        }

        if (filterBrand.length > 0) {
            data = data.filter(product => filterBrand.includes(product.brand))
        }

        setFilterProducts(data)
        setIsLoading(false)
    }

    const cancelFilter = () => {
        setIsLoading(true)
        setFilterPrice({
            priceMin: 0,
            priceMax: 0
        })
        setFilterBrand([])
        setFilterProducts(products)
        setIsLoading(false)
    }

    const [currentPage, setCurrentPage] = useState(1); // State to track current page
    const [pageSize, setPageSize] = useState(6)

    // Function to handle page change
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate index range for products to display on the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const productsToShow = filterProducts.slice(startIndex, endIndex);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Loading isLoading={isLoading}>
            <div style={{ background: '#efefef', height: 'auto', width: '100%' }}>
                <div style={{ width: '1270px', margin: '0 auto', height: 'auto' }}>
                    <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: 'calc(100% - 20px)' }}>
                        <WrapperNavbar span={4}>
                            <div style={{ backgroundColor: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold' }}>Lọc sản phẩm</div>

                                <WrapperContent>
                                    <span style={{ fontSize: '14px' }}>Hãng</span>
                                    <Checkbox.Group onChange={handleCheckbox} value={filterBrand} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} >
                                        {brands.map((brand) => {
                                            return (
                                                <Checkbox value={brand._id}>{brand.name}</Checkbox>
                                            )
                                        })}
                                    </Checkbox.Group>
                                </WrapperContent>

                                <WrapperContent style={{ marginTop: '20px' }}>
                                    <span>Giá</span>
                                    <Radio.Group
                                        style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}
                                        onChange={handleRadio}
                                        value={filterPrice.priceMax === 1000000 ? 'a' : (
                                            filterPrice.priceMin === 1000000 && filterPrice.priceMax === 10000000 ? 'b' : (
                                                filterPrice.priceMin === 10000000 ? 'c' : undefined
                                            )
                                        )}
                                    >
                                        <Radio value='a'>Dưới 1.000.000đ</Radio>
                                        <Radio value='b'>Từ 1.000.000đ đến 10.000.000đ</Radio>
                                        <Radio value='c'>Trên 10.000.000đ</Radio>
                                    </Radio.Group>
                                </WrapperContent>

                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                    <Button onClick={() => cancelFilter()}>
                                        Xóa tất cả
                                    </Button>
                                </div>
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                    <Button type="primary" onClick={() => filterProduct()}>
                                        Xem kết quả
                                    </Button>
                                </div>

                            </div>
                        </WrapperNavbar>

                        <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '20px' }} >
                            <WrapperProducts style={{ marginLeft: '40px' }}>
                                {filterProducts.length === 0 ? ( // Kiểm tra nếu không có sản phẩm
                                    <p>Không có sản phẩm nào được tìm thấy.</p>
                                ) : (
                                    // Hiển thị danh sách sản phẩm
                                    productsToShow.map((product) => (
                                        <CardComponent
                                            id={product._id}
                                            name={product.name}
                                            stock={product.stock}
                                            description={product.description}
                                            image={product.image}
                                            price={product.price}
                                            category={product.category}
                                            brand={product.brand}
                                        />
                                    ))
                                )}
                            </WrapperProducts>

                            <Pagination
                                defaultCurrent={1}
                                pageSize={pageSize}
                                total={filterProducts.length}
                                onChange={onPageChange}
                                style={{ textAlign: 'center', marginTop: '10px' }}
                                hideOnSinglePage={true}
                                showSizeChanger={false}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>
    )
}


export default TypeProductPage