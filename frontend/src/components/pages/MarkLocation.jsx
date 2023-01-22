import {Main} from "../styled/StyledLayout"
import React from "react"
import SelectField from "../form/SelectField.jsx"
import Title from "../common/Title.jsx"
import useForm from "../../hooks/useForm.js"
import Form from "../form/Form.jsx"
import FormButton from "../common/FormButton.jsx"
import {Stack} from "@mui/material"
import {isAlphaNumeric, isEmpty} from "../../validations/validations.js";
import useLocations from "../../hooks/useLocations.js";
import {updateLocation} from "../../services/usersService.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const MarkLocation = () => {

    const navigate = useNavigate()
    const {locations} = useLocations()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await updateLocation(formValues)
            if (response.status === 200) {
                toast.success("Ubicacion asignada correctamente")
                navigate("/home")

            }
        } catch (error) {
            toast.error("No se logro asignar una ubicacion.")
        }


    }
    const initialValues = {
        name: "",
    }
    const validateForm = (values) => {

        const errors = {}
        if (values.name === "") {
            errors.name = "Ubicacion es un campo requerido"
        }
        return errors
    }

    const {
        formValues,
        formErrors,
        isValidForm,
        handleSelectBlur,
        handleSelectChange,
    } = useForm(initialValues, validateForm)
    return (

        <Main>
            <Title>Seleccionar Ubicacion</Title>
            <Form onSubmit={handleSubmit} width="1000px">
                <Stack direction="row" justifyContent="center" spacing={2}>
                    <Stack spacing={2} width="400px">
                        <SelectField name="name" label="Ubicacion" value={formValues.name} options={locations}
                                     error={formErrors.name} helperText={formErrors.name}
                                     onChange={handleSelectChange} onBlur={handleSelectBlur}/>

                        <FormButton validate={() => isValidForm(formValues)}>Continuar</FormButton>
                    </Stack>
                </Stack>
            </Form>
        </Main>

    )

}

export default MarkLocation;