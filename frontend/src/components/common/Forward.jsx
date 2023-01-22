import {Navigate} from "react-router-dom"
import {useContext} from 'react';
import userContext from "../../context/userContext";

function Forward({children, redirectTo, destination}) {
    const {currentUser} = useContext(userContext)

    return currentUser && (currentUser.role=== 3 || currentUser.role === 4 )? children : <Navigate to={redirectTo} state={destination} replace/>
}

export default Forward