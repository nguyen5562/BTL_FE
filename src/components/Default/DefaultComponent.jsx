import React from "react";
import HeaderComponent from "../Header/HeaderComponent";
import FooterComponent from "../Footer/FooterComponent";

const DefaultComponent = ({children}) => {
    return (
        <div>
            <HeaderComponent />
            {children}
            <FooterComponent />
        </div>
    )
}

export default DefaultComponent