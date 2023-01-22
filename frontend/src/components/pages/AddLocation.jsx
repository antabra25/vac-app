import {Main} from "../styled/StyledLayout"
import Title from "../common/Title.jsx"
import Form from "../form/Form.jsx"
import NumberField from "../form/NumberField.jsx"
import SelectField from "../form/SelectField.jsx";
import FormButton from "../common/FormButton.jsx";
import useForm from "../../hooks/useForm.js";
import {isEmpty, isMaxLength, isNumber} from "../../validations/validations.js";
import {Stack, TextField} from "@mui/material";
import React from "react"
import useBuildings from "../../hooks/useBuildings.js";
import {getLocationById, saveLocation} from "../../services/useLocation.js"
import {toast} from "react-toastify";
import Panel from "../common/Panel.jsx";
import {useParams} from "react-router-dom";
import {useEffect} from "react";


const AddLocation = () => {

    const {buildings, errors} = useBuildings()
    const initialValues = {
        building: "",
        floor: "",

    }
    const validateForm = (values) => {

        const errors = {}

        if (values.building === "") {
            errors.building = "Edificio es un campo requerido"
        }
        if (isEmpty(values.floor)) {
            errors.floor = "Piso es un campo requerido"
        } else if (!isMaxLength(values.floor, 2)) {
            errors.floor = "Los pisos no superan los 2 caracteres"
        }

        return errors

    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        try {
            const response = await saveLocation(formValues)
            if (response.status === 201) {
                toast.success("Ubicacion Agregada.")
                setFormValues(initialValues)
            }
        } catch (error) {

        }


    }

    const {
        formValues,
        formErrors,
        setFormValues,
        isValidForm,
        handleChange,
        handleSelectChange,
        handleBlur
    } = useForm(initialValues, validateForm)

    const {id} = useParams()
    useEffect(() => {
        if (id) {
            const getLocation = async () => {
                try {
                    const response = await getLocationById(id)
                    if (response.status === 200) {
                        const location = response.data
                        setFormValues(location)
                    }
                } catch (error) {
                    console.log(error)
                    toast.error("Error al obtener la ubicacion.")

                }

            }
            getLocation()

        }
    }, [])

    return (

        <Main>
            <Title>Ubicación</Title>
            <Panel home="/add-location" list="/locations"/>
            <Form onSubmit={handleSubmit}>
                <Stack direction="row" justifyContent="center">
                    <Stack spacing={4} width="500px" direction="column">
                        <SelectField label="Edificio" options={buildings} value={formValues.building}
                                     name="building" id="building" helperText={formErrors.building}
                                     error={formErrors.building} onChange={handleSelectChange}/>
                        <TextField name="floor" id="floor" value={formValues.floor} error={formErrors.floor}
                                   helperText={formErrors.floor} onChange={handleChange} onBlur={handleBlur}
                                   label="Piso"/>
                        <FormButton validate={() => isValidForm(formValues)}>Agregar</FormButton>
                    </Stack>
                </Stack>
            </Form>
        </Main>

    )
}

export default AddLocation;