import { Input } from "antd";
import React from "react";

const InputComponent = ({size, placeholder, boreded, style, ...rests}) => {
    return (
        <Input 
            size={size}
            placeholder={placeholder}
            bordered={boreded}
            style={style}
            {...rests}
        />
    )
}

export default InputComponent