import React from "react";
import {TextField} from "@mui/material";

const InputText = ({name,label,id, value, type ="text", error,onChange,onBlur,...props}) => {
    return (
        <TextField
            id={id}
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            helperText={error}
            error={error}
            {...props}

        />
    )
}

export default InputText;