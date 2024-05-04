import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { ButtonMore, WrapperType } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.webp"
import slider2 from "../../assets/images/slider2.webp"
import slider3 from "../../assets/images/slider3.webp"
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/ProductService";
// import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";

const HomePage = () => {
    const arr = ['TV', 'Tủ lạnh', 'Máy giặt']

    const fetchProductAll = async () => {
        const res = await productService.getAllProduct()
        return res
    }

    const { isLoading, data: products } = useQuery(['products'], fetchProductAll, { retry: 3, retryDelay: 1000 })

    return (
        <div>
            <div style={{ padding: '0 120px' }}>
                <WrapperType>
                    {arr.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}
                </WrapperType>
            </div>

            <div className='body' style={{ width: '100%', backgroundColor: '#efefef', }}>
                <div id="container" style={{ padding: '0 120px', height: '100%' }}>
                    <SliderComponent arrImages={[slider1, slider2, slider3]} />

                    <div style={{ marginTop: '20px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        {products?.data?.map((product) => {
                            return (
                                <CardComponent
                                    key={product._id}
                                    name={product.name}
                                    stock={product.stock}
                                    description={product.description}
                                    image={product.image}
                                    price={product.price}
                                    category={product.category}
                                    brand={product.brand}
                                />
                            )
                        })}
                    </div>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <ButtonMore textbutton='Xem thêm' type='outline' styleButton={{
                            border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                            width: '240px', height: '38px', borderRadius: '4px'
                        }}
                            styleText={{ fontWeight: '500' }} />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default HomePage