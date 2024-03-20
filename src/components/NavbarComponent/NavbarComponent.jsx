import React from "react";
import { LabelText, NavbarPrice, OptionText, WrapperContent } from "./style";
import { Checkbox, Rate } from "antd";

const NavbarComponent = () => {
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return (                       
                        <OptionText>{option}</OptionText>
                )})
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} >
                        {options.map((option) => {
                            return (
                                <Checkbox value={option.value}>{option.label}</Checkbox> 
                            )    
                        })}             
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option) => {
                    return (  
                        <div>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span> từ {option} sao</span>
                        </div>                            
                )})
            case 'price':
                return options.map((option) => {
                    return (  
                        <NavbarPrice>{option}</NavbarPrice>                            
                )}) 
            default:
                return {
                    
                }
        }
    }

    return (
        <div style={{backgroundColor: 'white'}}>
            <LabelText>Label</LabelText>
            <WrapperContent>
                {renderContent('text', ['Tu lanh', 'Ti vi'])}
            </WrapperContent>

            <WrapperContent>
                {renderContent('checkbox', [
                    { value: 'A', label: 'A' },
                    { value: 'B', label: 'B' }
                ])}
            </WrapperContent>

            <WrapperContent>
                {renderContent('star', [3, 4, 5])}
            </WrapperContent>

            <WrapperContent>
                {renderContent('price', ['duoi 40', 'tren 50'])}
            </WrapperContent>
        </div>
    )
}

export default NavbarComponent