import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
    const { 
        size, placeholder, textbutton,
        bordered, backgroundcolorinput,
        backgroundcolorbutton, colorbutton
    } = props

    return (
        <div style={{ display: "flex" }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                boreded={bordered}
                style={{ backgroundColor: backgroundcolorinput }}
            />
            <ButtonComponent
                size={size}
                styleButton={{ background: backgroundcolorbutton, border: 'none' }}
                icon={<SearchOutlined style={{color: colorbutton}} />}
                textbutton={textbutton}
                styleText={{ color: colorbutton }}
            />
        </div>
    )
}

export default ButtonInputSearch