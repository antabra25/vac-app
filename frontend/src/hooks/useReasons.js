import {useState, useEffect} from "react";
import {getReasons} from "../services/useReason.js";

function useReasons() {
    const [reasons, setReasons] = useState([])

    const fetchReasons = async () => {

        try {
            const reasonResponse = await getReasons()
            setReasons([...reasonResponse.data.reasons])

        } catch (error) {


        }
    }

    useEffect(() => {
        fetchReasons()
    }, [])

    return {
        reasons,
        setReasons,
    }
}

export default useReasons;