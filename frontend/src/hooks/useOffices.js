import {useState, useEffect} from "react";
import {getOffices, getOfficeByBuildingId} from "../services/useOffice.js";


function useOffices(building) {

    const [offices, setOffices] = useState([])
    const [errors, setErrors] = useState('')

    const fetchOffices = async () => {
        try {
            let officesList = await getOffices()
            setOffices([...officesList.data.offices])
        } catch (error) {
            setErrors(error.response.data.detail)

        }
    }

    const fetchAllOfficeByBuilding = async (building) => {
        try {
            let officesList = await getOfficeByBuildingId(building)
            setOffices([...officesList.data.offices])
        } catch (error) {
            setErrors(error.response.data.detail)
        }
    }

    useEffect(() => {
        fetchOffices()

    }, [])
    return {
        offices,
        errors,
        fetchAllOfficeByBuilding,
        setOffices,
    }

}

export default useOffices;



