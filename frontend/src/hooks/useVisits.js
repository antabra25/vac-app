import {useEffect, useState} from "react";
import {
    getActiveVisits,
    getVisits,
    searchVisits,
    searchActiveVisits,
    closeVisits,
    checkVisit
} from "../services/useVisits.js";
import {toast} from "react-toastify";
import {removeItem} from "../utils/utils.js";



function useVisits(active, page, limit) {


    const [visits, setVisits] = useState([])
    const [total, setTotal] = useState(0)
    const [errors, setErrors] = useState('')
    const activeVisitors = async () => {
        try {
            const response = await getActiveVisits(page, limit)
            if (response.status === 200) {
                setVisits(response.data.visits)
                setTotal(response.data.total)

            }
        } catch (error) {
            setErrors(error)
            toast.error(error)
        }
    }
    const getVisit = async () => {
        try {
            const response = await getVisits(page, limit)
            if (response.status === 200) {
                setVisits(response.data.visits)
                setTotal(response.data.total)
            }

        } catch (error) {
            setErrors(error)
        }
    }

    const searchAllVisits = async (search, field) => {
        try {
            const response = await searchVisits(search, field)
            if (response.status === 200) {
                setVisits(response.data)
            }
        } catch (e) {
            setErrors(e)
        }


    }

    const searchActive = async (search) => {
        try {
            const response = await searchActiveVisits(search)
            if (response.status === 200) {
                setVisits(response.data)
            }
        } catch (e) {
            setErrors(e.response.data)

        }
    }

    const close = async (id) => {
        try {
            const response = await closeVisits(id)
            if (response.status === 200) {
                toast.success("Visita Cerrada")
                setVisits(removeItem(visits, id))
            }
        } catch (e) {
            toast.error("Error")

        }

    }

    const check = async (check) => {



        try {
            const response = await checkVisit(check)
            if (response.status === 201) {
                toast.success("Visitante Verificado.")
            }
        } catch (e) {

            toast.error("Error Visitante no Verificado.")
        }

    }
    useEffect(() => {
        if (active === true) {
            activeVisitors()
        } else {
            getVisit()
        }

    }, [])

    return {
        visits,
        total,
        errors,
        setVisits,
        searchAllVisits,
        searchActive,
        close,
        check
    }
}

export default useVisits;