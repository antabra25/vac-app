import React from "react";
import {Box} from "@mui/material"
import banner from "../../assets/images/banner.png"


const Banner = () => {
    return (
        <Box className="banner-container">
            <Box className="banner" sx={{
                display:"flex",
                flexFlow:"row nowrap",
                justifyContent:"center",
                marginBotton:"0px",
                maxWidth:'100vw'
            }}>
                    <img src={banner} alt="Banner" width="100%" />
                
            </Box>
        </Box>
    )
}

export default Banner