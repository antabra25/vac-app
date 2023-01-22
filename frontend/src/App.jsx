import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import userContext from "./context/userContext.js"
import LayOut from "./components/layout/LayOut";
import useUser from "./hooks/useUser.js";
import {useEffect} from "react";

const App = () => {

    useEffect(() => {
        setCurrentUserFromToken()
    }, [])

    const {
        currentUser,
        setCurrentUser,
        setCurrentUserFromToken,
        logoutUser,
        loginUser
    } = useUser()

    return (
        <div className="app">
            <userContext.Provider value={{currentUser, setCurrentUser, loginUser, logoutUser}}>
                <ThemeProvider theme={theme}>
                    <LayOut/>
                </ThemeProvider>
            </userContext.Provider>
        </div>
    )
}

export default App
