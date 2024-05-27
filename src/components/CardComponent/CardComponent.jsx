import React from "react";
import { CardName, CardStyle, CardText, PriceDiscount, PriceText } from "./style";
import { StarFilled } from "@ant-design/icons";
import logo from  '../../assets/images/logo.png'
import { useNavigate } from "react-router-dom";
import { serverConfig } from "../../const/serverConfig";
import { convertPrice } from '../../utils'

const CardComponent = (props) => {
    const { id, name, stock, description, image, price, category, brand } = props
    const navigate = useNavigate()
    const handleDetailProduct = () => {
        navigate(`/product-detail/${id}`)
    }
    return (
        <CardStyle
            hoverable
            headStyle={{ width: '200px', height: '200px' }}
            style={{ width: 300 }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src={`${serverConfig.server}/uploads/${image}`} />}
            onClick={handleDetailProduct}
        >
            <img src={logo} alt="" style={{ width: '102px', height: '21px', position: 'absolute', top: -1, left: -1, borderTopLeftRadius: '3px' }} />
            <CardName>{name}</CardName>
            <CardText>
                <span style={{ marginRight: '4px' }}>
                    <span>4.96 </span> <StarFilled style={{ color: 'yellow', fontSize: '12px' }} />&nbsp;
                </span>
                
                <span> | Da ban 1000+</span>
            </CardText>
            <PriceText>
                <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
                <PriceDiscount> -5%</PriceDiscount>
            </PriceText>
        </CardStyle>
    )
}

export default CardComponent