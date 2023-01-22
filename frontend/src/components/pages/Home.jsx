import React from "react"
import logo from "../../assets/images/carnet.png"
import {Main} from "../styled/StyledLayout"
import {Paper, Stack, Typography} from "@mui/material"
import Title from "../common/Title.jsx"
import Clock from "../common/Clock.jsx";
import Resume from "../common/Resume.jsx";
import BrandLogo from "../common/BrandLogo.jsx";
import useHome from "../../hooks/useHome.js";

const Home = () => {

    const {
        closeToday,
        activated,
        closedVisits,
        error
    } = useHome()

    return (

        <Main>


            <Stack direction="row" spacing={20} sx={{margin: "3rem 2rem", justifyContent: "center"}}>
                <Paper elevation={3} sx={{
                    height: "400px",
                    width: "700px",
                    display: "flex",
                    flexFlow: "column nowrap",
                    justifyContent: "space-around",
                    alignItems: "space-around",

                }}>
                    <Resume active={activated} closedToday={closeToday} closedVisit={closedVisits}/>
                    <Clock/>
                </Paper>
                <BrandLogo logo={logo}/>
            </Stack>

        </Main>

    )
}

export default Home;