import React from "react";
import {TextField,InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const InputSearch = ({name, label, id, value, error, onChange,onBlur, ...props}) => {
    return (
        <TextField
            id={id}
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type="search"
            helperText={error}
            error={error}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            {...props}

        />
    )
}

export default InputSearch;