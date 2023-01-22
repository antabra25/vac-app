import {useState} from "react";
import {NavLink} from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import {Menu, MenuItem, Stack, Button, IconButton} from "@mui/material";
import userContext from "../../context/userContext.js";
import {useContext} from 'react';

const CustomMenu = () => {

    const {currentUser} = useContext(userContext)
    const [anchorVisitor, setAnchorVisitor] = useState(null);
    const [anchorAdmin, setAnchorAdmin] = useState(null);


    const openVisitor = Boolean(anchorVisitor);
    const openAdmin = Boolean(anchorAdmin);


    const handleClickVisitor = (event) => {
        setAnchorVisitor(event.currentTarget);
    };
    const handleClickAdmin = (event) => {
        setAnchorAdmin(event.currentTarget);
    };


    const handleCloseVisitor = () => {
        setAnchorVisitor(null);
    };
    const handleCloseAdmin = () => {
        setAnchorAdmin(null);
    }

    return (
        <div className="menu">
            <Stack direction="row" spacing={1} className="menu-items" sx={{marginLeft: "1rem"}}>

                <IconButton sx={{color: "white"}} component={NavLink} to="/home">
                    <HomeIcon fontSize="medium"/>
                </IconButton>
                <Button
                    id="visitors"
                    aria-controls={openVisitor ? 'visitors' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openVisitor ? 'true' : undefined}
                    onClick={handleClickVisitor}
                    variant="contained"
                    disableElevation
                    startIcon={openVisitor ? <ArrowDropDownIcon/> : <ArrowRightIcon/>}
                >
                    VISITANTES
                </Button>
                <Button variant="contained" disableElevation component={NavLink} to="/active-visitors">
                    ACTIVOS
                </Button>
                {currentUser && (currentUser.role === 4 || currentUser.role === 1) &&
                    <Button variant="contained" disableElevation component={NavLink} to="/check">
                        VERIFICAR
                    </Button>}


                {currentUser && currentUser.role === 1 && (
                    <Button
                        id="admin"
                        aria-controls={openAdmin ? 'admin' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openAdmin ? 'true' : undefined}
                        onClick={handleClickAdmin}
                        variant="contained"
                        disableElevation
                        startIcon={openAdmin ? <ArrowDropDownIcon/> : <ArrowRightIcon/>}

                    >
                        ADMINISTRAR
                    </Button>)
                }
                {currentUser && (currentUser.role === 1 || currentUser.role === 2) &&
                    <Button variant="contained" disableElevation component={NavLink} to="/add-user">USUARIOS</Button>}
            </Stack>
            <Menu
                id="admin"
                anchorEl={anchorAdmin}
                open={openAdmin}
                onClose={handleCloseAdmin}
                MenuListProps={{
                    'aria-labelledby': 'admin',
                }}
            >
                <MenuItem onClick={handleCloseAdmin} component={NavLink} to="/add-building">Edificio</MenuItem>
                <MenuItem onClick={handleCloseAdmin} component={NavLink} to="/add-office">Oficina</MenuItem>
                <MenuItem onClick={handleCloseAdmin} component={NavLink} to="/add-location">Ubicación</MenuItem>
                <MenuItem onClick={handleCloseAdmin} component={NavLink} to="/add-reason">Motivo</MenuItem>
                <MenuItem onClick={handleCloseAdmin} component={NavLink} to="/passes">Pases</MenuItem>
                <MenuItem onClick={handleCloseAdmin} component={NavLink} to="/reports">Reporte</MenuItem>
            </Menu>

            <Menu
                id="visitors"
                anchorEl={anchorVisitor}
                open={openVisitor}
                onClose={handleCloseVisitor}
                MenuListProps={{
                    'aria-labelledby': 'visitors',
                }}>
                <MenuItem onClick={handleCloseVisitor} component={NavLink} to="/add-visitor"
                          color="inherit">Registro</MenuItem>
                <MenuItem onClick={handleCloseVisitor} component={NavLink} to="/visitors">Buscar</MenuItem>
            </Menu>

        </div>

    );
}
export default CustomMenu;