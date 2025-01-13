import React from "react";

const Button = ({ name, type, onClick, className }) => {
    return (
        <button className={className} type={type} onClick={onClick}>
            {name}
        </button>
    )
};

export default Button;