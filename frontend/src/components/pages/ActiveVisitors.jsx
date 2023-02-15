import {useEffect, useState} from "react"
import Title from "../common/Title.jsx"
import {Main} from "../styled/StyledLayout"
import VisitorCard from "../common/VisitorCard.jsx";
import InputSearch from "../common/InputSearch.jsx";
import useVisits from "../../hooks/useVisits.js"
import useForm from "../../hooks/useForm.js";
import FormButton from "../common/FormButton.jsx";
import Form from "../form/Form.jsx"
import {Box, Stack, Pagination, Button} from "@mui/material";
import {toast} from "react-toastify";
import usePagination from "../../hooks/usePagination.js";
import {isEmpty} from "../../validations/validations.js";
import {useContext} from "react";
import userContext from "../../context/userContext.js";


const ActiveVisitors = () => {

    const {currentUser} = useContext(userContext)
    const {page, handleChangePage, limit} = usePagination()
    const {visits, total, searchActive, close, check, setVisits} = useVisits(true, page, limit)
    const validateForm = (values) => {
        const errors = {}
        if (isEmpty(values.search)) {
            errors.search = "Buscar es un campo requerido"
        }
        return errors
    }
    const initialValues = {search: ""}

    const {formValues, formErrors, isValidForm, handleBlur, handleChange} = useForm(initialValues, validateForm)
    const handleSearch = (e) => {
        e.preventDefault()
        searchActive(formValues.search)
    }
    const handleCheck = (id) => {
        check({user:currentUser.user,visitor:id})
    }

    return (

        <Main>
            <Title>Visitantes Activos</Title>
            <Form onSubmit={handleSearch}>
                <Stack direction="row" spacing={2} height='55px'>
                    <InputSearch id="search" name="search" label="Buscar" value={formValues.search}
                                 onChange={handleChange} onBlur={handleBlur} error={formErrors.search}
                                 helperText={formErrors.search}/>
                    <FormButton validate={() => isValidForm(formValues)}>Enviar</FormButton>
                </Stack>
            </Form>

            <Stack justifyContent="center" spacing={2}>
                <Stack spacing={0} direction="row" width="100%" marginTop="1rem" flexWrap="wrap" justifyContent="start"
                       columnGap="1rem"
                       rowGap="1rem">
                    {visits.map((visit) => (
                        <VisitorCard id={visit._id} visitor={visit.visitor} key={visit._id} photo={visit.photo}
                                     ci={visit.ci} name={visit.name}
                                     lastName={visit.lastname}
                                     building={visit.building} office={visit.office} floor={visit.flat}
                                     host={visit.host} phone={visit.phone} onClose={close} onCheck={handleCheck}/>
                    ))}

                </Stack>
                <Pagination count={Math.floor(total / limit)} page={page} onChange={handleChangePage} color="primary"/>
            </Stack>


        </Main>
    )


}

export default ActiveVisitors;