import React from "react"
import {useEffect,useState} from "react";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import {Box, Typography} from "@mui/material"

const Clock = () => {

    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    }, []);

    const refreshClock = () => {
        setDate(new Date());
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '130px',
            width: "230px",
            borderColor: "primary.main",
            borderStyle: "solid",
            borderWidth: "1px",
            borderRadius: "10px",
            alignSelf:"flex-end",
            marginRight:"2rem",
        }}>

            <AccessAlarmsIcon sx={{fontSize: 80}} color="info.main"/>
            <Typography variant="h6" component="h6">{date.toLocaleTimeString()}</Typography>
        </Box>

    )

}


export default Clock;