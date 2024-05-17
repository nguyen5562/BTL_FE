import React from "react";
import { Button } from "antd";

const ButtonComponent = ({size, styleButton, styleText, textbutton, onClick, ...rests }) => {
    return (
        <Button
            size={size}
            style={styleButton}
            onClick={onClick}
            {...rests}
        > <span style={styleText}>{textbutton}</span> </Button>
    )
}

export default ButtonComponent