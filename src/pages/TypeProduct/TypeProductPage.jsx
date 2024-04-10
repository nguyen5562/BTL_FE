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
                <Col span={4} style={{ background: '#fff', marginRight: '50px', padding: '10px', borderRadius: '4px', width: '200px' }}>
                    <NavbarComponent />
                </Col>
            
                <div style={{ background: '#fff', borderRadius: '6px' }}>
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