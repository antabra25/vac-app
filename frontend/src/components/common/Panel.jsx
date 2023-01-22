import {NavLink} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import {Box,Breadcrumbs} from "@mui/material"


export default function Panel({home,list}) {
    return (
        <Box role="presentation" sx={{marginBottom:"2rem"}}  >
            <Breadcrumbs aria-label="breadcrumb">
                <NavLink
                    to={home}
                    style={{color: 'black', textDecoration: 'none'}}
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Registro
                </NavLink>
                <NavLink
                    style={{color: 'black', textDecoration: 'none'}}
                    to={list}
                >
                    <ListIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Lista
                </NavLink>
            </Breadcrumbs>
        </Box>
    );
}