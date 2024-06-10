import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperType } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.webp"
import slider2 from "../../assets/images/slider2.webp"
import slider3 from "../../assets/images/slider3.webp"
import CardComponent from "../../components/CardComponent/CardComponent";
import { productService } from "../../services/ProductService";
import { categoryService } from "../../services/CategoryService";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import { Carousel } from "antd";

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState([])

    const fetchProductAll = async () => {
        setIsLoading(true)
        const res = await productService.getAllProduct(searchDebounce)
        setProducts(res.data)
        setIsLoading(false)
    }

    const fetchCategory = async () => {
        const res = await categoryService.getAllCategory()
        setCategories(res.data)
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    useEffect(() => {
        fetchProductAll()
    }, [searchDebounce])

    const chunkedProducts = [];
    for (let i = 0; i < products.length; i += 4) {
        chunkedProducts.push(products.slice(i, i + 4));
    }

    return (
        <Loading isLoading={isLoading} >
            <div style={{ padding: '0 120px' }}>
                <WrapperType>
                    {categories.map((category) => {
                        return (
                            <TypeProduct name={category.name} id={category._id} />
                        )
                    })}
                </WrapperType>
            </div>

            <div className='body' style={{ width: '100%', backgroundColor: '#efefef', paddingBottom: '20px' }}>
                <div id="container" style={{ padding: '0 120px', height: '100%' }}>
                    <SliderComponent arrImages={[slider1, slider2, slider3]} />

                    {products.length === 0 ? (
                        <p style={{ marginTop: '40px', fontSize: '20px', display: 'flex', justifyContent: 'center' }}>Không tìm thấy sản phẩm nào</p>
                    ) : (
                        <div>
                            <p style={{ marginTop: '40px', fontSize: '20px', display: 'flex', justifyContent: 'center' }}>Danh sách sản phẩm</p>
                            <Carousel>
                                {chunkedProducts.map((chunk, index) => (
                                    <div key={index}>
                                        <div style={{ marginBottom: '20px', marginTop: '20px', display: 'flex', gap: '24px', flexWrap: 'wrap', fontWeight: '600' }}>
                                            {chunk.map((product) => (
                                                <CardComponent
                                                    key={product._id}
                                                    id={product._id}
                                                    name={product.name}
                                                    stock={product.stock}
                                                    description={product.description}
                                                    image={product.image}
                                                    price={product.price}
                                                    sold={product.sold}
                                                    category={product.category}
                                                    brand={product.brand}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    )}

                </div>
            </div>
        </Loading>
    )
}

export default HomePage