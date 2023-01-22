import {useState, useEffect} from "react";
import {getBuildings} from "../services/useBuildings.js";

function useBuildings() {

    const [buildings, setBuildings] = useState([])
    const [errors, setErrors] = useState('')

    const fetchBuildings = async () => {
        try {
            let buildingsList = await getBuildings()
            setBuildings([...buildingsList.data])
        } catch (error) {
            setErrors(error.response.data.detail)

        }

    }

    useEffect(() => {
        fetchBuildings()
    }, [])
    return {
        buildings,
        setBuildings,
        errors

    }
}

export default useBuildings;