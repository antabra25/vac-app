import {Navigate} from "react-router-dom"
import {useContext} from 'react';
import userContext from "../../context/userContext";

function Auth({children, redirectTo, destination}) {
    const {currentUser} = useContext(userContext)

    return currentUser ? children : <Navigate to={redirectTo} state={destination} replace/>
}

export default Auth