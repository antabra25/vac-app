import { Navigate } from "react-router-dom"
import { useContext } from 'react';
import userContext from "../../context/userContext";

function Admin ({ children, redirectTo, destination }) {
    const { currentUser } = useContext(userContext)

    return currentUser && (currentUser.role === 1 || currentUser.role === 2) ? children: <Navigate to={redirectTo} state={destination} replace />
}

export default Admin

