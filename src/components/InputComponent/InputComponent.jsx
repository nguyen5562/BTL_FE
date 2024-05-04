import { Input } from "antd";
import React from "react";

const InputComponent = ({size, placeholder, boreded, value, style, onChange, ...rests}) => {
    return (
        <Input 
            value={value}
            onChange={onChange}
            size={size}
            placeholder={placeholder}
            bordered={boreded}
            style={style}
            {...rests}
        />
    )
}

export default InputComponent