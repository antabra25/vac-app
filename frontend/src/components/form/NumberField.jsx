import {TextField} from "@mui/material";

const InputNumber = ({id, name, label, value, error, onChange, onBlur, ...props}) => {

    return (

        <TextField
            id={id}
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            helperText={error}
            error={error}
            type="number"
            {...props}
        />

    )


}

export default InputNumber;