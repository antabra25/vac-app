import React from "react"
import {Main} from "../styled/StyledLayout"
import Title from "../common/Title.jsx";
import {Stack} from "@mui/material";

const NotFound = () => {

    return (

        <Main>
            <Stack direction="column" alignItems="center" justifyContent="center" spacing={1} height="100%">
                <Title variant="h2">404</Title>
                <Title  variant="h2"> Pagina No Encontrada </Title>
            </Stack>
        </Main>

    )
}

export default NotFound;