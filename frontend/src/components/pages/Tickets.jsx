import React, {useState} from "react"
import Title from "../common/Title.jsx"
import {Main} from "../styled/StyledLayout.jsx"
import TicketTable from "../common/TicketTable.jsx";
import usePass from "../../hooks/usePass.js"
import {Stack, Box, Pagination, Button, Typography} from "@mui/material"
import InputSearch from "../common/InputSearch.jsx"
import usePagination from "../../hooks/usePagination.js";


const Tickets = () => {
    const headers = ['ID', 'Edificio', 'Activo', 'QR']
    const {page, handleChangePage, limit} = usePagination();
    const {passes, total, errors, searchPass} = usePass(page, limit);


    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        searchPass(search)
    }
    return (
        <Main>
            <Title>Pases</Title>
            <Stack mb="2rem" direction="row" spacing={2}>
                <InputSearch id="passSearch" name="search" label="Buscar" value={search}
                             onChange={(e) => setSearch(e.target.value)}/>
                <Button variant="outlined" onClick={handleSearch}>Enviar</Button>
            </Stack>
            <Stack alignItems="center" spacing={2}>
                <Stack direction="row" justifyContent="center" width="100%">
                    <TicketTable tickets={passes} headers={headers}/>
                </Stack>
                <Pagination count={Math.floor(total / limit)} page={page} onChange={handleChangePage}
                            color="primary"/>
                {!passes && <Typography variant="h3" component="h3">Sin Resultados</Typography>}
            </Stack>
        </Main>

    )

}

export default Tickets;