import {Main} from "../styled/StyledLayout"
import Title from "../common/Title.jsx"
import Form from "../form/Form.jsx"
import InputText from "../form/InputText.jsx"
import FormButton from "../common/FormButton.jsx";
import useForm from "../../hooks/useForm.js";
import {isEmpty, isMinLength} from "../../validations/validations.js";
import {saveReason, getReasonById} from "../../services/useReason.js"
import {Stack} from "@mui/material";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import Panel from "../common/Panel.jsx";


const AddOffice = () => {

    const initialValues = {
        name: "",
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await saveReason(formValues)
            if (response.status === 201) {
                toast.success("Razon Agregada.")
                setFormValues(initialValues)
            } else if (response.status === 200) {
                toast.success("Razon Actualizada.")
            }

        } catch (error) {
            toast.error("Error al agregar la Razon.")

        }

    }

    const validateForm = (values) => {
        const errors = {}
        if (isEmpty(values.name)) {
            errors.name = "Razon es un campo requerido"
        } else if (!isMinLength(values.name, 4)) {
            errors.name = "Razon debe tener al menos 4 caracteres"
        }

        return errors
    }

    const {
        formValues,
        formErrors,
        setFormValues,
        isValidForm,
        handleBlur,
        handleChange
    } = useForm(initialValues, validateForm)

    const {id} = useParams()
    useEffect(() => {
        if (id) {
            const getReason = async () => {
                try {
                    const response = await getReasonById(id)
                    if (response.status === 200) {
                        const values = response.data
                        setFormValues(values)

                    }
                } catch (e) {


                }

            }
            getReason()
        }
    }, [])

    return (

        <Main>
            <Title>Motivo</Title>
            <Panel home="/add-reason" list="/reasons"/>
            <Form onSubmit={handleSubmit}>
                <Stack direction="row" justifyContent="center">
                    <Stack spacing={4} width="500px" direction="column">
                        <InputText label="Motivo de Visita" name="name" value={formValues.name}
                                   onChange={handleChange}
                                   onBlur={handleBlur} error={formErrors.name}/>
                        <FormButton validate={() => isValidForm(formValues)}>Agregar</FormButton>
                    </Stack>
                </Stack>
            </Form>
        </Main>
    )
}

export default AddOffice;