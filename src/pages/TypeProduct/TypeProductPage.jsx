import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import { useLocation } from "react-router-dom";
import { productService } from "../../services/ProductService";
import Loading from "../../components/Loading/Loading";

const TypeProductPage = () => {
    const location = useLocation();
    const { state } = location;
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchProductByCategory = async () => {
        setIsLoading(true)
        await productService.getAllProductCategory(state.id, searchDebounce)
        // await productService.getAllProduct(searchDebounce)
            .then((res) => setProducts(res.data))
        setIsLoading(false)
    }

    useEffect(() => {
        fetchProductByCategory()
    }, [searchDebounce])

    const onchange = () => { }
    return (
        <Loading isLoading={isLoading}>
            <div style={{ background: '#efefef', height: 'calc(100vh - 64px)', width: '100%' }}>
                <div style={{ width: '1270px', margin: '0 auto', height: '100%' }}>
                    <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: 'calc(100% - 20px)' }}>
                        <WrapperNavbar span={4}>
                            <NavbarComponent />
                        </WrapperNavbar>

                        <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <WrapperProducts>
                                {products.length === 0 ? ( // Kiểm tra nếu không có sản phẩm
                                    <p>Không có sản phẩm nào được tìm thấy.</p>
                                ) : (
                                    // Hiển thị danh sách sản phẩm
                                    products.map((product) => (
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
                                defaultCurrent={2}
                                total={100}
                                onChange={onchange}
                                style={{ textAlign: 'center', marginTop: '10px' }}
                                hideOnSinglePage={true}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>

    )
}

export default TypeProductPage