import {Main} from "../styled/StyledLayout"
import WebCam from "../webcam/WebCam.jsx"
import Title from "../common/Title.jsx";
import InputText from "../form/InputText.jsx";
import SelectField from "../form/SelectField.jsx";
import FormButton from "../common/FormButton.jsx";
import Form from "../form/Form.jsx";
import {isEmpty, isNumber, isPhone} from "../../validations/validations.js";
import NumberField from "../form/NumberField.jsx";
import useForm from "../../hooks/useForm.js";
import {Typography, Stack, TextField} from "@mui/material";
import useBuildings from "../../hooks/useBuildings.js";
import useWebcam from "../../hooks/useWebcam.js";
import useOffices from "../../hooks/useOffices.js";
import useReasons from "../../hooks/useReasons.js";
import {saveVisit} from "../../services/useVisits.js"
import {useState} from "react";
import {toast} from "react-toastify";
import {getVisitorById} from "../../services/useVisitors.js";
import usePass from "../../hooks/usePass.js";



const AddVisitor = () => {


    const {buildings} = useBuildings()
    const {reasons} = useReasons()
    const {fetchOnePass, available} = usePass()
    const {photo, getImage} = useWebcam()
    const [extension, setExtension] = useState('')

    const initialValues = {
        ci: "",
        phone: "",
        name: "",
        lastname: "",
        company: "",
        building: "",
        office: "",
        host: "",
        reason: "",
        ticket: "",
        photo: ""
    }

    const validateForm = (values) => {

        const errors = {}

        if (values.ci.trim() === "") {
            errors.ci = 'Cedula es un campo requerido'
            return errors
        } else if (!isNumber(values.ci)) {
            errors.ci = 'Ingresa un valor numerico'
            return errors
        }
        if (isEmpty(values.name)) {
            errors.name = 'Nombre es un campo requerido'
            return errors
        }
        if (isEmpty(values.lastname)) {
            errors.lastname = 'Apellido es un campo requerido'
            return errors
        }
        if (isEmpty(values.phone)) {
            errors.phone = 'Telefono es un campo requerido'
            return errors

        } else if (!isPhone(values.phone)) {
            errors.phone = 'Ingresa un telefono valido.'
            return errors
        }
        if (isEmpty(values.company)) {
            errors.company = 'Empresa es un campo requerido'
            return errors
        }
        if (values.building === "") {
            errors.building = 'Edificio es un campo requerido'
            return errors
        }
        if (values.office === "") {
            errors.office = 'Oficina es un campo requerido'
            return errors
        }
        if (isEmpty(values.host)) {
            errors.host = 'Anfitrion es un campo requerido'
            return errors
        }
        if (isEmpty(values.reason)) {
            errors.reason = 'Motivo es un campo requerido'
            return errors
        }
        if (isEmpty(values.ticket)) {
            errors.ticket = 'Ticket es un campo requerido'
            return errors
        } else if (!isNumber(values.ticket)) {
            errors.ticket = 'El ticket debe ser un numero'
            return errors
        }
        if (!available) {
            errors.ticket = 'El ticket ingresaso no existe'
            return errors
        }

        if (isEmpty(formValues.photo)) {
            toast.info("Recuerda tomar la foto")
        }

        return errors
    }


    const {
        formValues,
        formErrors,
        setFormErrors,
        setFormValues,
        isValidForm,
        handleSelectChange,
        handleChange,
        handleSelectBlur,
        handleBlur
    } = useForm(initialValues, validateForm)

    const handleBuildingSelect = (e) => {
        handleSelectChange(e)
        fetchAllOfficeByBuilding(e.target.value)
    }

    const {offices, errors, fetchAllOfficeByBuilding} = useOffices()
    const handleSubmit = async (e) => {
        e.preventDefault()
        formValues.photo = photo
        try {
            const response = await saveVisit(formValues)
            if (response.status === 201) {
                toast.success("Visita agregada")
                setFormValues(initialValues)
            }
        } catch (error) {
            toast.error("Error visita no agregada.")
        }

    }
    const handleBlurCi = (e) => {
        handleChange(e);
        handleGetVisitor()
        setFormErrors(validateForm(formValues));
    }
    const handleBlurTicket = (e) => {
        handleChange(e);
        fetchOnePass(formValues.ticket)
        setFormErrors(validateForm(formValues))

    }
    const handleSelectChangeOffice = async (e) => {
        handleSelectChange(e)
        const currentOffice = offices.find(office => office.name === formValues.office)
        setExtension(currentOffice.phone)
    }
    const handleGetVisitor = async () => {

        try {
            const response = await getVisitorById(formValues.ci)
            if (response.status === 200) {
                const visitor = response.data
                setFormValues({
                    ...formValues,
                    name: visitor.name,
                    lastname: visitor.lastname,
                    phone: visitor.phone,
                    photo: visitor.photo,
                })
            }

        } catch (error) {
            if (error.response.status === 404) {
                toast.info("Visitante no registrado")
            }
        }

    }
    return (

        <Main>

            <WebCam onTakePicture={getImage} srcImage={formValues.photo} top="1rem" right="2rem" position="absolute"/>

            <Form onSubmit={handleSubmit}>
                <Typography variant='subtitle1' fontSize="18px" component='h2' mb="1rem" color="black">Datos
                    Personales</Typography>
                <Stack direction='column' spacing={2} width="450px">
                    <Stack direction='row' justifyContent='space-between' spacing={1}>
                        <InputText id="ci" name="ci" label="Numero de Cedula" value={formValues.ci}
                                   onChange={handleChange} onBlur={handleBlurCi}
                                   error={formErrors.ci}
                                   helperText={formErrors.ci}/>
                        <InputText id="name" name="name" label="Nombre" value={formValues.name} onChange={handleChange}
                                   onBlur={handleBlur} error={formErrors.name} helperText={formErrors.name}/>

                    </Stack>
                    <Stack direction='row' justifyContent='space-between' spacing={1}>
                        <InputText id="lastname" name="lastname" label="Apellido" value={formValues.lastname}
                                   onChange={handleChange} onBlur={handleBlur} error={formErrors.lastname}
                                   helperText={formErrors.lastname}/>
                        <InputText id="phone" name="phone" label="Numero de Telefono" value={formValues.phone}
                                   onChange={handleChange} onBlur={handleBlur} error={formErrors.phone}
                                   helperText={formErrors.phone}/>
                    </Stack>

                    <Typography variant='subtitle1' fontSize="18px" component='h2' mb="1rem">Visita</Typography>


                    <InputText id="company" name="company" label="Empresa" value={formValues.company}
                               onChange={handleChange} onBlur={handleBlur} error={formErrors.company}
                               helperText={formErrors.company}/>

                    <SelectField id="building" name="building" label="Edificio" value={formValues.building}
                                 onChange={handleBuildingSelect} onBlur={handleSelectBlur} error={formErrors.building}
                                 helperText={formErrors.building} options={buildings}/>
                    <SelectField id="office" name="office" label="Oficina" value={formValues.office}
                                 onChange={handleSelectChangeOffice} onBlur={handleSelectBlur} error={formErrors.office}
                                 helperText={formErrors.office} options={offices}/>
                    <InputText id="host" name="host" label="Anfitrion" value={formValues.host} onChange={handleChange}
                               onBlur={handleBlur}
                               error={formErrors.host} helperText={formErrors.host}/>
                    <SelectField id="reason" name="reason" label="Motivo" value={formValues.reason}
                                 onChange={handleSelectChange} onBlur={handleSelectBlur} error={formErrors.reason}
                                 options={reasons} helperText={formErrors.reason}/>

                    <Stack direction='row' justifyContent='space-between' spacing={1}>

                        <InputText id="extension" name="extension" label="Extension" value={extension}
                                   InputProps={{
                                       readOnly: true,
                                   }}/>
                        <InputText id="ticket" name="ticket" label="Ticket" value={formValues.ticket}
                                   onChange={handleChange} onBlur={handleBlurTicket}
                                   error={formErrors.ticket} helperText={formErrors.ticket}/>
                    </Stack>
                    <FormButton validate={() => isValidForm(formValues)}>Registrar</FormButton>
                </Stack>
            </Form>
        </Main>
    )
}

export default AddVisitor;