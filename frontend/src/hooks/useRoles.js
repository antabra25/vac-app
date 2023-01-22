import {useState, useEffect} from "react";
import {getRoles} from "../services/useRole.js";

function useRoles() {
    const [roles, setRoles] = useState([])
    const [errors, setErrors] = useState('')
    const fetchRoles = async () => {
        try {
            const rolesResponse = await getRoles()
            setRoles([...rolesResponse.data])

        } catch (error) {
            setErrors(error.response.data.detail)

        }
    }

    useEffect(() => {
        fetchRoles()
    }, [])

    return {
        roles,
        errors,
        setRoles
    }
}

export default useRoles;