import React from "react";
import {Button} from "@mui/material";

const FormButton = ({children,validate, ...props}) => {
    return (
        <Button
            type="submit"
            variant="contained"
            disabled={!validate()}
            sx={{marginTop: '1rem'}}
            {...props}
        >
            {children}
        </Button>
    )
}


export default FormButton;