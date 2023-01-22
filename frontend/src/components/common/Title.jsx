import React from "react"
import {Typography} from "@mui/material";

const Title = ({children, textAlign = 'center', ...props}) => <Typography variant="h4" component="h1"
                                                                          textAlign={textAlign} marginBottom="4rem"
                                                                          fontWeight="bold"
                                                                          color="info.main" {...props}>{children}</Typography>

export default Title