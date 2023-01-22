import React from "react";
import {TextField} from "@mui/material";

const InputRead = ({name, label, id, value, ...props}) => {
    return (
        <TextField
            id={id}
            name={name}
            label={label}
            value={value}
             InputLabelProps={{ shrink: true }}
            type="text"
            variant="filled"
        />
    )
}

export default InputRead;