import {Main} from "../styled/StyledLayout"
import React from "react"
import Title from "../common/Title.jsx";
import Panel from "../common/Panel.jsx";
import useBuildings from "../../hooks/useBuildings.js";
import BuildingTable from "../common/BuildingTable.jsx";
import {saveBuilding, deleteBuilding} from "../../services/useBuildings.js";
import {removeItem} from "../../utils/utils.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {Stack} from "@mui/material";


const Buildings = () => {

    const navigate = useNavigate()
    const {buildings} = useBuildings()
    const headers = ["Nro", "Nombre", "Direccion", "Editar", "Eliminar"]
    const handleEdit = (id) => {
        navigate(`/edit-building/${id}`)

    }
    const handleDelete = async (id) => {
        try {
            const response = await deleteBuilding(id)
            if (response.status === 200) {
                toast.success("Edificio Eliminado")
            }
        } catch (error) {
            toast.error("Error al eliminar el edificio")
        }
    }

    return (

        <Main>
            <Title>Edificio</Title>
            <Panel home="/add-building" list="/buildings"/>
            <Stack direction="row" justifyContent="center">
                <BuildingTable buildings={buildings} headers={headers} onDelete={handleDelete} onEdit={handleEdit}/>

            </Stack>

        </Main>

    )

}

export default Buildings;