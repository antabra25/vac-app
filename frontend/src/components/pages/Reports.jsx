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


const Reports = () => {

    const options = [
        {value: "1", label: "Edificio 1"},
        {value: "2", label: "Edificio 2"},
        {value: "3", label: "Edificio 3"},
    ]
    const initialValues = {
        buildingName: "",
        officeName: "",
        from: "",
        to: "",
    }

    const validateForm = (values) => {

        const errors = {}

        if (values.buildingName === "") {
            errors.buildingName = "Edificio es un campo requerido"
        }
        if (values.officeName === "") {
            errors.officeName = "Oficina es un campo requerido"
        }
        if (isEmpty(values.from)) {
            errors.from = "Desde es un campo requerido"
        }
        if (isEmpty(values.to)) {
            errors.to = "Hasta es un campo requerido"
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

                        <SelectField id="buildingName" name="buildingName" label="Edificio" options={options}
                                     error={formErrors.buildingName} value={formValues.buildingName}
                                     helperText={formErrors.buildingName} onChange={handleSelectChange} onBlur={handleSelectBlur}/>


                        <SelectField id="officeName" name="officeName" label="Oficina" options={options}
                                     value={formValues.officeName}
                                     error={formErrors.officeName} helperText={formErrors.officeName}
                                     onChange={handleSelectChange} onBlur={handleSelectBlur}/>


                        <InputText id="from" name="from" type="date" label="Desde" error={formErrors.from}
                                   value={formValues.from} helperText={formErrors.from} onChange={handleChange}
                                   onBlur={handleBlur} InputLabelProps={{
                            shrink: true
                        }}/>

                        <InputText id="to" name="to" type="date" label="Hasta" error={formErrors.to}
                                   value={formValues.to} helperText={formErrors.to} onChange={handleChange}
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