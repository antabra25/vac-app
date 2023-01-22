import {useEffect, useState} from "react";
import {getPasses, searchPasses, getPassById} from "../services/usePasses.js";

function usePass(page = 1, limit = 10) {
    const [passes, setPasses] = useState([])
    const [total, setTotal] = useState(0)
    const [available, setAvailable] = useState(null)
    const [errors, setErrors] = useState('')

    const fetchPass = async () => {
        try {
            const response = await getPasses(page, limit)
            if (response.status === 200) {
                setPasses(response.data.passes)
                setTotal(response.data.total)
            }

        } catch (error) {
            setErrors(error)

        }

    }
    const searchPass = async (search) => {
        try {
            const response = await searchPasses(search)
            if (response.status === 200) {
                setPasses(response.data)
            }
        } catch (error) {

            setErrors(error)

        }
    }

    const fetchOnePass = async (id) => {
        try {
            const response = await getPassById(id)
            if (response.status === 200 && response.data.activated === false) {
                setAvailable(true)
            }else {
                setAvailable(false)
            }
        } catch (e) {
            if (e.response.status === 404) {
                setAvailable(false)
            } else {
                setErrors(e.response)
            }

        }


    }

    useEffect(() => {
        fetchPass()
    }, [page, limit])

    return {
        searchPass,
        passes,
        total,
        available,
        errors,
        fetchOnePass
    }
}

export default usePass;