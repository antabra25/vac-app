import React from "react"
import {Main} from "../styled/StyledLayout"
import {Stack, Button} from "@mui/material";
import Title from "../common/Title.jsx"
import Form from "../form/Form.jsx"
import useForm from "../../hooks/useForm.js";
import InputText from "../form/InputText.jsx";
import FormButton from "../common/FormButton.jsx";
import Panel from "../common/Panel.jsx";
import {getBuildingById, saveBuilding} from "../../services/useBuildings.js";
import {isEmpty, isAlphaNumeric} from "../../validations/validations.js";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {getReasonById} from "../../services/useReason.js";

const AddBuilding = () => {

    const initialValues = {
        name: "",
        address: "",
    }
    const validateForm = (values) => {

        const errors = {}

        if (isEmpty(values.name)) {
            errors.name = "Edificio es un campo requerido"
            return errors

        } else if (!isAlphaNumeric(values.buildingName)) {
            errors.name = "Edificio solo puede contener letras y numeros"
            return errors

        }
        if (isEmpty(values.address)) {
            errors.address = "Direccion es un campo requerido"
            return errors

        } else if (!isAlphaNumeric(values.address)) {
            errors.address = "Direccion solo puede contener letras y numeros"
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
    } = useForm(initialValues, validateForm)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await saveBuilding(formValues)
            if (response.status === 201) {
                toast.success("Edificio Agregado")
                setFormValues(initialValues)
            }
            else if(response.status === 200){
                toast.success("Edificio Actualizado")
            }
        } catch (error) {
            toast.error("Error al agregar el Edificio")

        }

    }
    const {id} = useParams()
    useEffect(() => {
        if (id) {
            const getBuilding = async () => {
                try {
                    const response = await getBuildingById(id)
                    if (response.status === 200) {
                        const values = response.data
                        setFormValues(values)

                    }
                } catch (e) {


                }

            }
            getBuilding()
        }
    }, [])

    return (
        <Main>
            <Title>Edificio</Title>
            <Panel home="/add-building" list="/buildings"/>

            <Form onSubmit={handleSubmit}>
                <Stack direction="row" justifyContent="center">
                    <Stack spacing={4} width="500px" direction="column">
                        <InputText label="Nombre del Edificio" id="name" name="name"
                                   error={formErrors.name} helperText={formErrors.name}
                                   value={formValues.name} onChange={handleChange} onBlur={handleBlur}/>
                        <InputText label="Dirección" name="address" id="address" error={formErrors.address}
                                   helperText={formErrors.address} value={formValues.address} onChange={handleChange}
                                   onBlur={handleBlur}/>
                        <FormButton validate={() => isValidForm(formValues)}>Agregar</FormButton>
                    </Stack>
                </Stack>
            </Form>
        </Main>
    )

}

export default AddBuilding