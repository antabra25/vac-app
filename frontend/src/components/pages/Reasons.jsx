import React from "react"
import Title from "../common/Title.jsx"
import {Main} from "../styled/StyledLayout"
import Panel from "../common/Panel.jsx";
import ReasonTable from "../common/ReasonTable.jsx";
import useReasons from "../../hooks/useReasons.js";
import {useNavigate} from "react-router-dom";
import {deleteReason} from "../../services/useReason.js";
import {removeItem} from "../../utils/utils.js";
import {Stack} from "@mui/material";
import {toast} from "react-toastify";


const Reasons = () => {

    const {reasons, setReasons} = useReasons()

    const navigate = useNavigate()
    const headers = ["Nro", "Razón", "Editar", "Eliminar"]
    const handleOnEdit = (id) => {
        navigate(`/edit-reason/${id}`)
    }
    const handleOnDelete = async (id) => {
        const response = await deleteReason(id)
        if (response.status === 204) {
            toast.success("Razon Eliminada.")
            setReasons(removeItem(reasons, id))
        }

    }


    return (
        <Main>
            <Title>Motivos</Title>
            <Panel home="/add-reason" list="/reasons"/>
            <Stack direction="row" justifyContent="center">
                <ReasonTable headers={headers} reasons={reasons} onEdit={handleOnEdit} onDelete={handleOnDelete}/>
            </Stack>
        </Main>
    )
}

export default Reasons;