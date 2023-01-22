import React from "react"
import {Main} from "../styled/StyledLayout"
import Title from "../common/Title.jsx";
import Panel from "../common/Panel.jsx";
import OfficeTable from "../common/OfficeTable.jsx";
import {useNavigate} from "react-router-dom";
import {deleteOfficeById} from "../../services/useOffice.js";
import {toast} from "react-toastify";
import useOffices from "../../hooks/useOffices.js";
import {removeItem} from "../../utils/utils.js";
import {Stack} from "@mui/material";

const Offices = () => {
    const navigate = useNavigate()
    const {offices, setOffices} = useOffices()
    const headers = ["Nro", "Nombre", "Edificio", "Acronimo", "Piso", "Telf", "Editar", "Eliminar"]
    const handleEdit = (id) => {
        navigate(`/edit-office/${id}`)

    }

    const handleDelete = async (id) => {
        try {
            const response = await deleteOfficeById(id)
            if (response.status === 204) {
                toast.success("Oficina Eliminado")
                setOffices(removeItem(offices, id))
            }
        } catch (error) {
            toast.error("Error al eliminar la oficina")
        }
    }

    return (

        <Main>
            <Title>Oficinas</Title>
            <Panel home="/add-office" list="/offices"/>
            <Stack direction="row" justifyContent="center">
                <OfficeTable offices={offices} headers={headers} onDelete={handleDelete} onEdit={handleEdit}/>
            </Stack>
        </Main>

    )
}

export default Offices;