import {Main} from "../styled/StyledLayout"
import React from "react"
import Title from "../common/Title.jsx";
import Panel from "../common/Panel.jsx";
import {useNavigate} from "react-router-dom";
import useLocations from "../../hooks/useLocations.js";
import {toast} from "react-toastify";
import {deleteLocation} from "../../services/useLocation.js";
import LocationTable from "../common/LocationTable.jsx";
import {Stack} from "@mui/material";


const Locations = () => {

    const {locations, setLocations} = useLocations()
    const navigate = useNavigate()
    const headers = ["Nro", "Nombre", "Editar", "Eliminar"]
    const handleEdit = (id) => {
        navigate(`/edit-location/${id}`)

    }
    const handleDelete = async (id) => {
        try {
            const response = await deleteLocation(id)
            if (response.status === 200) {
                toast.success("Ubicacion Eliminado")
            }
        } catch (error) {
            toast.error("Error al eliminar ubicacion")
        }
    }

    return (

        <Main>
            <Title>Ubicaciones</Title>
            <Panel home="/add-location" list="/locations"/>
            <Stack direction="row" justifyContent="center">
                <LocationTable locations={locations} headers={headers} onDelete={handleDelete} onEdit={handleEdit}/>
            </Stack>

        </Main>

    )

}

export default Locations;