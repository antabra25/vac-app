import React from "react"
import {Box, Typography} from "@mui/material"


const Resume = ({active, closedToday, closedVisit }) => {

    return (

        <Box sx={{margin: "1rem 2rem", display: "flex", flexFlow: "column nowrap", rowGap: "0.8rem"}}>
            <Typography variant="h3" component="h3">Visitantes Activos:{active}</Typography>
            <Typography variant="h5" component="h5">Total:{closedToday}</Typography>
            <Typography variant="h5" component="h5">Cerradas:{closedVisit}</Typography>

        </Box>

    )
}


export default Resume;
