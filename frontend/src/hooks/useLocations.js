import {useState, useEffect} from "react";
import {getLocations} from "../services/useLocation.js";

function useLocations() {
    const [locations, setLocations] = useState([])

    const fetchLocations = async () => {
        try {
            const locationResponse = await getLocations()
            setLocations([...locationResponse.data])

        } catch (error) {


        }
    }

    useEffect(() => {
        fetchLocations()
    }, [])

    return {
        locations,
        setLocations,
    }
}

export default useLocations;