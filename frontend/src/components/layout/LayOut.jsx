import React from "react";
import {Stack} from '@mui/material';
import {useLocation} from 'react-router-dom';
import Footer from "./Footer";
import NavBar from "./NavBar";
import Content from "./Content";
import Banner from "./Banner";

const LayOut = () => {

    let location = useLocation()

    return (
        <div className="layout-container">
            <Stack direction="column" sx={{
                maxWidth: '100%',
                margin: '0',
            }}>
                <Banner/>
                {location.pathname === "/" || location.pathname==="/set-location" ? null : <NavBar/>}
                <Content/>
                {location.pathname === "/" ? null : <Footer/>}
            </Stack>
        </div>
    )


}

export default LayOut
