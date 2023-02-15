import React from "react"
import {Stack} from "@mui/material";
import Title from "../common/Title.jsx"
import Form from "../form/Form.jsx"
import InputText from "../form/InputText.jsx"
import SelectField from "../form/SelectField.jsx";
import FormButton from "../common/FormButton.jsx";
import useForm from "../../hooks/useForm.js";
import {isEmpty} from "../../validations/validations.js";
import {Main} from "../styled/StyledLayout"
import useBuildings from "../../hooks/useBuildings.js";
import useOffices from "../../hooks/useOffices.js";


const Reports = () => {

    const {buildings} = useBuildings()
    const {offices} = useOffices()

    const initialValues = {
        building: "",
        office: "",
        since: "",
        until: "",
    }

    const validateForm = (values) => {

        const errors = {}

        if (values.building === "") {
            errors.building = "Edificio es un campo requerido"
        }
        if (values.office === "") {
            errors.office = "Oficina es un campo requerido"
        }
        if (isEmpty(values.since)) {
            errors.since = "Desde es un campo requerido"
        }
        if (isEmpty(values.until)) {
            errors.until = "Hasta es un campo requerido"
        }
        return errors
    }
    const {
        formValues,
        formErrors,
        isValidForm,
        handleBlur,
        handleChange,
        handleSelectChange,
        handleSelectBlur
    } = useForm(initialValues, validateForm)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formValues)
    }

    return (

        <Main>
            <Title>Generar Reporte</Title>
            <Form onSubmit={handleSubmit}>
                <Stack direction="row" justifyContent="center">
                    <Stack spacing={4} width="500px" direction="column">

                        <SelectField id="building" name="building" label="Edificio" options={buildings}
                                     error={formErrors.building} value={formValues.building}
                                     helperText={formErrors.building} onChange={handleSelectChange}
                                     onBlur={handleSelectBlur}/>


                        <SelectField id="office" name="office" label="Oficina" options={offices}
                                     value={formValues.office}
                                     error={formErrors.office} helperText={formErrors.office}
                                     onChange={handleSelectChange} onBlur={handleSelectBlur}/>


                        <InputText id="since" name="since" type="date" label="Desde" error={formErrors.since}
                                   value={formValues.since} helperText={formErrors.since} onChange={handleChange}
                                   onBlur={handleBlur} InputLabelProps={{
                            shrink: true
                        }}/>

                        <InputText id="until" name="until" type="date" label="Hasta" error={formErrors.until}
                                   value={formValues.until} helperText={formErrors.until} onChange={handleChange}
                                   onBlur={handleBlur} InputLabelProps={{
                            shrink: true
                        }}/>

                        <FormButton validate={() => isValidForm(formValues)}>Generar</FormButton>

                    </Stack>
                </Stack>
            </Form>


        </Main>

    )


}

export default Reports;