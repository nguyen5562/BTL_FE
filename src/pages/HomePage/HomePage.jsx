import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperType } from "./style";

const HomePage = () => {
    const arr = ['TV', 'Tủ lạnh', 'Máy giặt']
    return (
        <div style={{ padding: '0 120px' }}>
            <WrapperType>
                {arr.map((item) => {
                    return (
                        <TypeProduct name= {item} key={item} />
                    )
                })}           
            </WrapperType>
            HomePage
        </div>  
    )
}

export default HomePage