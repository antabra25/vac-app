import {Main} from "../styled/StyledLayout"
import Title from "../common/Title.jsx";
import {Button, Stack} from "@mui/material";
import {savePass} from "../../services/usePasses.js";
import {toast} from "react-toastify";
import SelectField from "../form/SelectField.jsx";
import NumberField from "../form/NumberField.jsx";
import useForm from "../../hooks/useForm.js"
import Form from "../form/Form.jsx"
import FormButton from "../common/FormButton.jsx";
import useBuildings from "../../hooks/useBuildings.js";
import {isEmpty, isNumber} from "../../validations/validations.js";
import React from "react";


const Generator = () => {

    const {buildings} = useBuildings()

    const initialValues = {
        qt: "",
        building: "",
    }
    const validateForm = (values) => {

        const errors = {}

        if (values.building === "") {
            errors.building = "Edificio es un campo requerido"
            return errors
        }

        if (isEmpty(values.qt)) {
            errors.qt = "Cantidad es un campo requerido"
            return errors
        } else if (!isNumber(values.qt)) {
            errors.qt = "Cantidad debe ser un numero"
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
        handleSelectChange,
        handleSelectBlur
    } = useForm(initialValues, validateForm)

    const handleSubmitGenerate = async (e) => {
        e.preventDefault()
        try {
            const response = await savePass(formValues)
            if (response.status === 201) {
                toast.success('Pases generados con exito')
            }

        } catch (error) {
            toast.error('Error al generar pases')
        }
    }

    return (
        <Main>
            <Title>Generador de Pases</Title>
            <Form onSubmit={handleSubmitGenerate}>
                <Stack direction="row" justifyContent="center" alignItems="center" height="70vh">
                    <Stack width="500px" spacing={2}>
                        <NumberField id="name" name="qt" label="Cantidad" value={formValues.qt} onChange={handleChange}
                                     onBlur={handleBlur} error={formErrors.qt} helperText={formErrors.qt}/>

                        <SelectField name="building" label="Edificio" value={formValues.building} options={buildings}
                                     error={formErrors.building} helperText={formErrors.building}
                                     onChange={handleSelectChange} onBlur={handleSelectBlur}/>
                        <FormButton validate={() => isValidForm(formValues)}>Generar</FormButton>
                    </Stack>
                </Stack>
            </Form>
        </Main>
    )


}

export default Generator;