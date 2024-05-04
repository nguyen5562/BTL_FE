import React from "react";
import { CardName, CardStyle, CardText, PriceDiscount, PriceText } from "./style";
import { StarFilled } from "@ant-design/icons";
import logo from  '../../assets/images/logo.png'

const CardComponent = (props) => {
    const { name, stock, description, image, price, category, brand } = props
    return (
        <CardStyle
            hoverable
            headStyle={{ width: '200px', height: '200px' }}
            style={{ width: 300 }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630" />}
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
                <span style={{ marginRight: '8px' }}>{price}đ</span>
                <PriceDiscount> -5%</PriceDiscount>
            </PriceText>
        </CardStyle>
    )
}

export default CardComponent