import React from "react"
import {styled} from "@mui/material"


export const Main = styled('main')(({theme}) => ({
    display: "flex",
    flexFlow: "column nowrap",
    margin: '2rem 4rem',
    maxWidth: "100%",
    backgroundColor: "white",
    position: "relative",

}))

export const MainLog = styled('main')(({theme}) => ({
    backgroundColor: theme.palette.secondary.main,
    width: "100vw",

}))


