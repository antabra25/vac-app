import {Main} from "../styled/StyledLayout"
import Title from "../common/Title.jsx"
import Form from "../form/Form.jsx"
import InputText from "../form/InputText.jsx"
import SelectField from "../form/SelectField.jsx";
import FormButton from "../common/FormButton.jsx";
import {isEmpty, isMinLength, isAlphaNumeric, isNumber, isPhone, isMaxLength} from "../../validations/validations.js";
import useForm from "../../hooks/useForm.js";
import useBuildings from "../../hooks/useBuildings.js"
import {Stack} from "@mui/material";
import {getOfficeById, saveOffice} from "../../services/useOffice.js";
import {toast} from "react-toastify";
import Panel from "../common/Panel.jsx";
import React from "react";
import {useParams} from "react-router-dom";
import {useEffect} from "react";


const AddOffice = () => {


    const {buildings, errors} = useBuildings()
    const initialValues = {
        name: "",
        acronym: "",
        building: "",
        flat: "",
        phone: "",

    }
    const validateForm = (values) => {

        const errors = {}

        if (values.building === "") {
            errors.building = "Edificio es un campo requerido"
            return errors
        }

        if (isEmpty(values.name)) {
            errors.name = "Oficina es un campo requerido"
            return errors

        } else if (!isAlphaNumeric(values.name)) {
            errors.name = "Oficina solo puede contener letras y numeros"
            return errors

        }
        if (isEmpty(values.acronym)) {
            errors.acronym = "Acronimo es un campo requerido"
            return errors

        } else if (!isAlphaNumeric(values.acronym)) {
            errors.acronym = "Acronimo solo puede contener letras y numeros"
            return errors

        }
        if (isEmpty(values.flat)) {
            errors.flat = "Piso es un campo requerido"
            return errors
        } else if (!isMaxLength(values.flat, 2)) {
            errors.flat = "Los pisos no superan los 2 caracteres"
            return errors
        }
        if (isEmpty(values.phone)) {
            errors.phone = "Telefono es un campo requerido"
            return errors
        } else if (!isPhone(values.phone)) {
            errors.phone = "Debes ingresar un numero de telefono valido"
            return errors
        }

        return errors

    }


    const {
        formValues,
        formErrors,
        setFormValues,
        isValidForm,
        handleBlur,
        handleChange,
        handleSelectChange,
        handleSelectBlur

    } = useForm(initialValues, validateForm)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await saveOffice(formValues)
            if (response.status === 201) {
                toast.success("Oficina Agregada")
                setFormValues(initialValues)
            }
        } catch (error) {


        }
    }
    const {id} = useParams()
    useEffect(() => {
        if (id) {
            const getOffice = async () => {
                try {
                    const response = await getOfficeById(id)
                    if (response.status === 200) {
                        const values = response.data
                        setFormValues(values)
                    }
                } catch (e) {


                }

            }
            getOffice()
        }
    }, [])

    return (
        <Main>

            <Title>Oficina</Title>
            <Panel home="/add-office" list="/offices"/>
            <Form onSubmit={handleSubmit}>
                <Stack direction="row" justifyContent="center">
                    <Stack spacing={4} width="500px" direction="column">

                        <InputText name="name" label="Nombre de la oficina" value={formValues.name}
                                   error={formErrors.name} onChange={handleChange} onBlur={handleBlur}/>
                        <InputText name="acronym" label="Acronimo" value={formValues.acronym} error={formErrors.acronym}
                                   onChange={handleChange} onBlur={handleBlur}/>
                        <SelectField name="building" label="Edificio" value={formValues.building} options={buildings}
                                     error={formErrors.building} helperText={formErrors.building}
                                     onChange={handleSelectChange} onBlur={handleSelectBlur}/>
                        <InputText name="flat" label="Piso" value={formValues.flat} error={formErrors.flat}
                                   onChange={handleChange} onBlur={handleBlur}/>
                        <InputText name="phone" type="tel" label="Telefono" value={formValues.phone}
                                   error={formErrors.phone}
                                   onChange={handleChange} onBlur={handleBlur}/>

                        <FormButton validate={() => isValidForm(formValues)}>Agregar</FormButton>
                    </Stack>
                </Stack>
            </Form>
        </Main>
    )
}

export default AddOffice;