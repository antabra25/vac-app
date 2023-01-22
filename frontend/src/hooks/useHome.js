import {resumeVisit} from "../services/useVisits.js";
import {useEffect, useState} from "react";


function useHome() {

    const [closedVisits, setClosedVisits] = useState(0)
    const [activated, setActivated] = useState(0)
    const [closeToday, setCloseToday] = useState(0)
    const [error, setError] = useState('')

    const getResume = async () => {
        try {
            const response = await resumeVisit()
            if (response.status === 200) {
                setActivated(response.data.activated)
                setCloseToday(response.data.today)
                setClosedVisits(response.data.closed)
            }
        } catch (e) {
            setError('Error')
        }
    }

    useEffect(() => {
        getResume()
    }, [])

    return {
        closeToday,
        activated,
        closedVisits,
        error
    }
}

export default useHome;
