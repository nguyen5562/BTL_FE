import { Col, Row } from "antd";
import styled from "styled-components";

export const WrapperProducts = styled(Row)`
    display: flex;
    gap: 12px;
    margin-top:20px;
    flex-wrap: wrap;
`

export const WrapperNavbar = styled(Col)`
    background: #fff; 
    margin-right: 10px;
    padding: 10px;
    border-radius: 4px;
    height: fit-content;
    margin-top : 20px;
    width: 200px;
`

export const WrapperContent = styled.div`
    display: flex;
    //align-items: center;
    flex-direction: column;
    gap: 12px;
`