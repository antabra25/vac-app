import React from "react"
import {Main} from "../styled/StyledLayout"
import Title from "../common/Title.jsx"
import Panel from "../common/Panel.jsx";
import useUser from "../../hooks/useUser.js";
import UserTable from "../common/UserTable.jsx";
import {deleteUserById} from "../../services/useUsers.js";
import {useNavigate} from "react-router-dom";
import {removeItem} from "../../utils/utils.js";
import {toast} from "react-toastify";
import {Stack} from "@mui/material";

const Users = () => {

    const headers = ["Nro", "Nombre", "Apellido", "Usuario", "Correo", "Rol", "Editar", "Eliminar"]
    const navigate = useNavigate()
    const {users, setUsers} = useUser()

    const handleEdit = (id) => {
        navigate(`/edit-user/${id}`)

    }
    const handleDelete = async (id) => {
        try {
            const response = await deleteUserById(id)
            if (response.status === 204) {
                toast.success("Usuario Eliminado")
                setUsers(removeItem(users, id))
            }
        } catch (error) {
            toast.error("Error al eliminar Usuario")
        }
    }
    return (

        <Main>
            <Title>Usuarios</Title>
            <Panel home="/add-user" list="/users"/>
            <Stack direction="row" justifyContent="center">

                <UserTable users={users} headers={headers} onDelete={handleDelete} onEdit={handleEdit}/>
            </Stack>
        </Main>

    )
}

export default Users;