import {useEffect, useState} from "react"
import auth from "../services/authService"
import {getUsers} from "../services/useUsers.js"


function useUser() {
    const [currentUser, setCurrentUser] = useState(null)
    const [users, setUsers] = useState([])

    const mapUserProperties = ({user, role, username}) => {
        return {
            user,
            role,
            username
        }
    }

    const setCurrentUserFromToken = () => {
        const token = auth.getJwt()

        if (token) {
            const user = auth.getJwtData(token)
            setCurrentUser(user)
        }
    }

    const loginUser = (token) => {
        auth.login(token)

        const data = auth.getJwtData(token)
        const userData = mapUserProperties(data)
        setCurrentUser(userData)
    }

    const logoutUser = () => {
        auth.logout()
        setCurrentUser(null)
    }
    const fetchUsers = async () => {
        try {
            let usersList = await getUsers()
            setUsers([...usersList.data.users])
        } catch (e) {

        }
    }
    useEffect(() => {
        fetchUsers()
    }, [])

    return {
        currentUser,
        setCurrentUser,
        users,
        setUsers,
        setCurrentUserFromToken,
        loginUser,
        logoutUser
    }
}

export default useUser