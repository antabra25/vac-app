import React, {useEffect, useState} from "react"
import {Main} from "../styled/StyledLayout"
import Title from "../common/Title.jsx"
import InputSearch from "../common/InputSearch.jsx";
import SelectField from "../form/SelectField.jsx"
import {Stack, Pagination} from "@mui/material";
import {toast} from "react-toastify";
import {deleteVisit} from "../../services/useVisits.js";
import {removeItem} from "../../utils/utils.js";
import useVisits from "../../hooks/useVisits.js";
import VisitTable from "../common/VisitTable.jsx";
import Form from "../form/Form.jsx"
import FormButton from "../common/FormButton.jsx";
import {isEmpty} from "../../validations/validations.js";
import useForm from "../../hooks/useForm.js";
import usePagination from "../../hooks/usePagination.js";


const Visitors = () => {
    const headers = ['C.I', 'Nombre', 'Apellido', 'Telf', 'Pase', 'Oficina', 'Piso', 'Huesped', 'Fecha', 'Eliminar']

    const {page, handleChangePage, limit} = usePagination()
    const {visits, setVisits, searchAllVisits, total} = useVisits(false, page, limit)
    const filters = [{_id: 1, name: "Oficina"}, {_id: 2, name: "CI"}, {_id: 3, name: "Telf"}, {_id: 4, name: "Fecha"}]
    const initialValues = {
        search: "",
        field: ""
    }
    const validateForm = (values) => {
        const errors = {}
        if (isEmpty(values.search)) {
            errors.search = "Campo Busqueda es un campo requerido"
            return errors
        }
        if (values.field === "") {
            errors.field = "Campo filtro es requerido"
        }
        return errors
    }
    const {
        formValues,
        formErrors,
        isValidForm,
        handleSelectChange,
        handleChange,
        handleBlur,
        handleSelectBlur
    } = useForm(initialValues, validateForm)
    const handleDelete = async (id) => {
        try {
            const response = await deleteVisit(id)
            if (response.status === 204) {
                toast.success("Visita Eliminado")
                setVisits(removeItem(visits, id))
            }
        } catch (error) {
            toast.error("Error al eliminar la Visita")
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        searchAllVisits(formValues.search, formValues.field)

    }


    return (

        <Main>
            <Title>Visitas< /Title>
            <Form onSubmit={handleSearch}>
                <Stack direction="row" width="600px" height="60px" spacing={2}>
                    <InputSearch id="search" name="search" label="Buscar"
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={formValues.search} error={formErrors.search} helperText={formErrors.search}/>
                    <SelectField id="field" name="field" label="Filtrar" onChange={handleSelectChange}
                                 onBlur={handleSelectBlur}
                                 value={formValues.field} error={formErrors.field}
                                 helperText={formErrors.field}
                                 options={filters}/>
                    <FormButton validate={() => isValidForm(formValues)}>Enviar</FormButton>
                </Stack>
            </Form>
            <Stack marginTop="4rem">
                <VisitTable visits={visits} headers={headers} onDelete={handleDelete}/>
                <Pagination count={Math.floor(total / limit)} page={page} onChange={handleChangePage} color="primary"/>
            </Stack>
        </Main>

    )
}

export default Visitors;