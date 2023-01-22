import React from "react";
import {Divider, Box, Typography, Stack} from '@mui/material';

const Footer = () => {

    const year = new Date().getFullYear();

    return (

        <div className="footer-container">
            <div className="footer">
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "flex-start",
                    alignItems: "center",
                    height: "140px",
                    backgroundColor: "info.main",
                    padding: '0px 2rem',
                    columnGap: '1.2rem'
                }}>
                    <Stack direction="column">
                        <Typography variant="h5" component="h5" color="secondary.main" sx={{
                            fontWeight: 'bold',
                        }}>MPPEFCE</Typography>
                        <Typography variant="subtitle" component="p" color="secondary.main">Ministerio del Poder Popular
                            de Economia,<br/> Finanzas y Comercio Exterior.</Typography>
                    </Stack>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{
                        borderColor:"secondary.main",
                    }} />
                    <Stack direction="column">
                        <Typography variant="subtitle" component="p" color="secondary.main">Oficina de Seguridad y
                            Proteccion Integral</Typography>
                        <Typography variant="subtitle" component="p" color="secondary.main">Control de Acceso
                            Visitantes</Typography>
                        <Typography variant="subtitle" component="p" color="secondary.main">{year}, Caracas,
                            Venenzuela</Typography>
                            <Typography variant="subtitle" component="p" color="secondary.main">
                            Ext : 1040-1093-6564
                            </Typography>
                    </Stack>
                          <Divider orientation="vertical" variant="middle" flexItem sx={{
                        borderColor:"secondary.main",
                    }} />
                    <Stack direction="column">
                    <Typography variant="subtitle" component="p" color="secondary.main">Copyright © 2022 OTIC</Typography>
                     <Typography variant="subtitle" component="p" color="secondary.main">Oficina de Tecnologias de la Informacion y la Comunicacion.</Typography>
                    </Stack>
                    
                </Box>
            </div>
        </div>
    )
}

export default Footer;