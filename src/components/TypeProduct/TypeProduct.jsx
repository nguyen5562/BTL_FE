import React from "react";
import { useNavigate } from "react-router-dom";
import { WrapperType } from "./style";
import { useSelector } from "react-redux";

const TypeProduct = ({name, id}) => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const navigate = useNavigate()
    const onClick = () => {
        navigate(`/product/${name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state : {id}})
    }
    return (
        <WrapperType onClick={onClick} >
            {name}
        </WrapperType>
    )
}

export default TypeProduct