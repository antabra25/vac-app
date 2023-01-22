import {AppBar, Toolbar, Badge, IconButton} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useContext} from "react";
import userContext from "../../context/userContext.js";
import CustomMenu from "./Menu.jsx";
import {useNavigate} from "react-router-dom";


const NavBar = () => {

    const navigate = useNavigate()
    const {logoutUser} = useContext(userContext)

    const logOut = () => {
        logoutUser()
        navigate("/login")
    }
    return (
        <div className="nav-container">
            <AppBar position="static"
                    sx={{
                        backgroundColor: 'primary.main',
                        display: "flex",
                        flexFlow: "row nowrap",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
            >
                <CustomMenu/>
                <Toolbar>

                    <IconButton arial-label="alert" sx={{
                        color: "white"
                    }}>
                        <Badge badgeContent={1} color="secondary">
                            <NotificationsIcon fontSize="medium"/>
                        </Badge>
                    </IconButton>

                    <IconButton aria-label="logout" onClick={logOut}>
                        <LogoutIcon color="secondary"/>
                    </IconButton>

                </Toolbar>

            </AppBar>
        </div>
    )
}

export default NavBar;