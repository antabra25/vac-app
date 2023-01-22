import {MainLog} from "../styled/StyledLayout"
import loginImage from "../../assets/images/loginVAC.jpg"
import {Stack, Typography} from "@mui/material";
import InputField from "../form/InputText.jsx"
import FormButton from "../common/FormButton.jsx";
import Form from "../form/Form.jsx"
import {isEmpty, isMinLength, isValidPassword} from "../../validations/validations.js";
import useForm from "../../hooks/useForm.js";
import Title from "../common/Title.jsx"
import authService from "../../services/authService.js";
import {login} from "../../services/usersService.js"
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import userContext from "../../context/userContext.js";


const Login = () => {
    const navigate = useNavigate()
    const {loginUser} = useContext(userContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await login(formValues.username, formValues.password)
            if (response.status === 200) {
                const token = response.data
                loginUser(token)
                navigate("/set-location")
            }
        } catch (error) {

            if (error.response.status === 403) {
                formErrors.password = "Usuario o Contraseña Invalidas"
                setFormErrors({...formErrors})
            }
        }
    }


    const initialValues = {
        username: '',
        password: ''
    }
    const validateForm = (values) => {

        const errors = {}

        if (isEmpty(values.username)) {
            errors.username = "Usuario es un campo requerido"
            return errors
        } else if (!isMinLength(values.username, 6)) {
            errors.username = "Usuario debe tener al menos 6 caracteres"
        }

        if (isEmpty(values.password)) {
            errors.password = "Contraseña es un campo requerido"
            return errors
        } else if (!isValidPassword(values.password)) {
            errors.password = "Contraseña invalida"
            return errors
        }

        return errors
    }

    const {
        formValues,
        formErrors,
        isValidForm,
        handleChange,
        handleBlur,
        setFormErrors
    } = useForm(initialValues, validateForm)

    return (
        <MainLog>

            <Stack direction="row" width="100%" spacing={0} alignItems="center">
                <Stack spacing={2} width="50vw" alignItems="center" marginBottom="20rem">
                    <Form onSubmit={handleSubmit}>
                        <Stack width="250px" spacing={2}>
                            <Title>Conectarse</Title>
                            <InputField id="username" name="username" label="Usuario" value={formValues.username}
                                        onChange={handleChange} onBlur={handleBlur} error={formErrors.username}
                                        helperText={formErrors.username}/>
                            <InputField id="password" name="password" label="Contraseña" value={formValues.password}
                                        onBlur={handleBlur} onChange={handleChange} error={formErrors.password}
                                        helperText={formErrors.password} type="password"/>
                            <FormButton validate={() => isValidForm(formValues)}>Entrar</FormButton>
                        </Stack>
                    </Form>
                </Stack>
                <Stack width="50vw" position="relative">
                    <div>
                        <Typography position="absolute" fontWeight="bold" color="secondary.main" variant="h3"
                                    component="h1"
                                    paddingX="1rem" paddingY="20rem">Sistema de Control de
                            Acceso <br/> MPPEFCE.</Typography>
                    </div>

                    <img src={loginImage} alt="Login Image"/>

                </Stack>
            </Stack>
        </MainLog>
    )
}

export default Login;