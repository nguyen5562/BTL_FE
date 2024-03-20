import { Card } from "antd";
import styled from "styled-components";

export const CardStyle = styled(Card)`
    width: 200px;
    & img {
        height: 200px;
        width: 200px;
    }
    position: relative;
`

export const CardName = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: rgb(56, 56, 61);
    font-weight: 400;
`

export const CardText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0;
`

export const PriceText = styled.div`
    font-weight: 500;
    font-size: 16px;
    color: rgb(255, 66, 78);
`

export const PriceDiscount = styled.span`
    font-weight: 500;
    font-size: 12px;
    color: rgb(255, 66, 78);
`