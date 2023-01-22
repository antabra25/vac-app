import Title from "../common/Title.jsx"
import Form from "../form/Form.jsx"
import FormButton from "../common/FormButton.jsx"
import useForm from "../../hooks/useForm.js"
import InputText from "../form/InputText.jsx"
import {isEmpty} from "../../validations/validations.js";
import {Stack} from "@mui/material"
import {Main} from "../styled/StyledLayout"


const AddDevices = () => {


    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const initialValues = {
        name1: "",
        serial1: "",
        name2: "",
        serial2: "",
        name3: "",
        serial3: "",
        name4: "",
        serial4: ""
    }
    const validateForm = (values) => {
        const errors = {}
        if (isEmpty(values.name1)) {
            errors.name1 = "Campo requerio."
        }
        if (isEmpty(values.serial1)) {
            errors.serial1 = "Campo requerido."
        }
        return errors
    }
    const {formValues, formErrors, isValidForm, handleChange, handleBlur,} = useForm(initialValues, validateForm)

    return (
        <Main>
            <Title variant="subtitle1" textAlign="left">Dispositivos</Title>
            <Form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <Stack direction="row" spacing={2}>
                        <InputText name="name1" id="name1" label="Nombre Articulo" onChange={handleChange}
                                   onBlur={handleBlur} error={formErrors.name1} helperText={formErrors.name1}/>
                        <InputText name="serial1" id="serial1" label="Nombre Articulo" onChange={handleChange}
                                   onBlur={handleBlur} error={formErrors.serial1} helperText={formErrors.serial1}/>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <InputText name="name2" id="name2" label="Nombre Articulo" onChange={handleChange}
                                   onBlur={handleBlur} error={formErrors.name2} helperText={formErrors.name2}/>
                        <InputText name="serial2" id="serial2" label="Serial" onChange={handleChange}
                                   onBlur={handleBlur} error={formErrors.serial2} helperText={formErrors.serial2}/>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <InputText name="name3" id="name3" label="Nombre Articulo" onChange={handleChange}
                                   onBlur={handleBlur} error={formErrors.name3} helperText={formErrors.name3}/>
                        <InputText name="serial3" id="serial3" label="Serial" onChange={handleChange}
                                   onBlur={handleBlur} error={formErrors.serial3} helperText={formErrors.serial3}/>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <InputText name="name4" id="name4" label="Nombre Articulo" onChange={handleChange}
                                   onBlur={handleBlur} error={formErrors.name4} helperText={formErrors.name4}/>
                        <InputText name="serial4" id="serial4" label="Serial" onChange={handleChange}
                                   onBlur={handleBlur} error={formErrors.serial4} helperText={formErrors.serial4}/>
                    </Stack>
                    <Stack width="470px">
                        <FormButton validate={() => isValidForm(formValues)}>Registrar</FormButton>
                    </Stack>
                </Stack>
            </Form>
        </Main>
    )
}

export default AddDevices;