import {TextField, MenuItem} from "@mui/material";

const SelectField = ({name, label, value, error, options, onChange, ...props}) => {
    return (
        <TextField
            select
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            helperText={error}
            error={error}
            {...props}
        >
            {options.map((option) => (
                <MenuItem key={option._id} value={option.name}>
                    {option.name}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default SelectField;