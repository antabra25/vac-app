import {Navigate} from "react-router-dom"
import {useContext} from 'react';
import userContext from "../context/userContext";

function Receptionist({children, redirectTo, destination}) {
    const {currentUser} = useContext(userContext)

    return currentUser && currentUser.role === 3 ? children : <Navigate to={redirectTo} state={destination} replace/>
}

export default Receptionist