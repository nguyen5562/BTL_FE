import React from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperProducts } from "./style";

const TypeProductPage = () => {
    const onchange = () => {}
    return (
        <div style={{ padding: '0 120px', background: '#efefef' }}>
            <Row style={{ flexWrap: 'nowrap', paddingTop: '10px' }}>
                <Col span={4} style={{ background: '#fff', marginRight: '10px', padding: '10px', borderRadius: '6px' }}>
                    <NavbarComponent />
                </Col>
            
                <div>
                    <WrapperProducts span={24}>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </WrapperProducts> 

                    <Pagination defaultCurrent={2} total={100} onChange={onchange} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}/>    
                </div>                  
            </Row>          
        </div>       
    )
}

export default TypeProductPage