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

                    <div style={{ marginTop: '20px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
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
                    </div>
                </div>
            </div>
        </Loading>
    )
}

export default HomePage