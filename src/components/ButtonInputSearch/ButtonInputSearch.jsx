import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React from "react";

const ButtonInputSearch = (props) => {
    const { size, placeholder, textbutton, backgroundcolorbutton, colorbutton } = props
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Input size={size} placeholder={placeholder} />
            <Button style={{background: backgroundcolorbutton, border: 'none', color: colorbutton}} size={size} icon={<SearchOutlined />}>{textbutton}</Button>
        </div>
    )
}

export default ButtonInputSearch