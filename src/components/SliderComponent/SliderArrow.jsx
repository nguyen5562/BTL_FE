import React from "react"

const Arrow = (props) => {
    const { className, style, onClick, display, background } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: display, background: background, color: 'blue' }}
            onClick={onClick}
        />
    )
}

export default Arrow