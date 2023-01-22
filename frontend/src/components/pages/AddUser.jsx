import {Main} from "../styled/StyledLayout"
import {Stack} from "@mui/material"
import Title from "../common/Title.jsx";
import InputText from "../form/InputText.jsx";
import SelectField from "../form/SelectField.jsx";
import Form from "../form/Form.jsx";
import useForm from "../../hooks/useForm.js";
import FormButton from "../common/FormButton.jsx";
import {isEmpty, isEmail, isValidPassword, isMinLength} from "../../validations/validations.js";
import WebCam from "../webcam/WebCam.jsx"
import useRoles from "../../hooks/useRoles.js";
import useWebcam from "../../hooks/useWebcam.js";
import {getUserById, saveUser} from "../../services/useUsers.js";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import Panel from "../common/Panel.jsx";


const AddUser = () => {

    const {roles, errors} = useRoles()
    const {getImage, photo} = useWebcam()
    const initialValues = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        username: '',
        role: '',
        photo: ''
    }

    const validateForm = (values) => {

        const errors = {}
        if (isEmpty(values.name)) {
            errors.name = "El nombre es requerido"
            return errors
        }
        if (isEmpty(values.lastname)) {
            errors.lastname = "El apellido es requerido"
            return errors
        }
        if (isEmpty(values.email)) {
            errors.email = 'Email es un campo requerido'
            return errors
        } else if (!isEmail(values.email)) {
            errors.email = 'Dirección de Correo no valido'
            return errors
        }
        if (isEmpty(values.username)) {
            errors.username = 'Nombre de usuario es un campo requerido'
            return errors
        } else if (!isMinLength(values.username, 6)) {
            errors.username = 'Nombre de usuario debe tener al menos 6 caracteres'
            return errors
        }

        if (isEmpty(values.password)) {
            errors.password = 'Contraseña es un campo requerido'
            return errors

        } else if (!isValidPassword(values.password)) {
            errors.password = 'Contraseña no valida'
            return errors
        }

        if (values.role === "") {
            errors.role = 'Rol es un campo requerido'
            return errors
        }
        return errors

    }
    const {
        formValues,
        formErrors,
        setFormValues,
        isValidForm,
        handleSelectBlur,
        handleChange,
        handleBlur,
        handleSelectChange
    } = useForm(initialValues, validateForm)


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userResponse = await saveUser({...formValues, photo: photo})
            if (userResponse.status === 201) {
                toast.success("Usuario creado satifactoriamente.")
                setFormValues(initialValues)
            } else {
                toast.success("Usuario actualizado.")
            }
        } catch (error) {
            toast.error("Error creating user")
        }

    }
    const {id} = useParams()
    useEffect(() => {
        if (id) {
            const getUser = async () => {
                try {
                    const response = await getUserById(id)
                    if (response.status === 200) {
                        const values = response.data
                        setFormValues({...values, password: ""})
                    }
                } catch (e) {


                }

            }
            getUser()
        }
    }, [])


    return (

        <Main>
            <Title>Usuario</Title>
            <Panel home="/add-user" list="/users"/>
            <Form onSubmit={handleSubmit}>
                <Stack direction='row' justifyContent='space-evenly' spacing={1}>
                    <Stack spacing={2} width="450px">
                        <InputText id="name" name="name" label="Nombre" value={formValues.name} onBlur={handleBlur}
                                   onChange={handleChange} error={formErrors.name} helperText={formErrors.name}/>
                        <InputText id="lastname" name="lastname" label="Apellido" value={formValues.lastname}
                                   onBlur={handleBlur}
                                   onChange={handleChange} error={formErrors.lastname}
                                   helperText={formErrors.lastname}/>
                        <InputText id="email" name="email" label="Correo" value={formValues.email} onBlur={handleBlur}
                                   onChange={handleChange} error={formErrors.email} helperText={formErrors.email}/>
                        <InputText id="username" name="username" label="Nombre de usuario" value={formValues.username}
                                   onBlur={handleBlur} onChange={handleChange} error={formErrors.username}
                                   helperText={formErrors.username}/>
                        <InputText id="password" name="password" label="Contraseña" value={formValues.password}
                                   onChange={handleChange} onBlur={handleBlur} error={formErrors.password}
                                   helperText={formErrors.password} type="password"/>

                        <SelectField id="role" name="role" label="Rol" value={formValues.role}
                                     onChange={handleSelectChange} onBlur={handleSelectBlur} error={formErrors.role}
                                     helperText={formErrors.role} options={roles}/>
                        <FormButton validate={() => isValidForm(formValues)}>Registrar</FormButton>
                    </Stack>
                    <WebCam onTakePicture={getImage} srcImage={formValues.photo}/>
                </Stack>

            </Form>


        </Main>
    )
}

export default AddUser;