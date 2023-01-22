import React from "react"
const BrandLogo = ({logo}) => {
    return (
        <div className="brand-logo">
        <img src={logo} alt="logo" />
        </div>
    );
}

export  default BrandLogo;