import React from "react";
import { Button } from "antd";

const ButtonComponent = ({size, styleButton, styleText, textbutton, ...rests }) => {
    return (
        <Button
            size={size}
            style={styleButton}
            {...rests}
        > <span style={styleText}>{textbutton}</span> </Button>
    )
}

export default ButtonComponent