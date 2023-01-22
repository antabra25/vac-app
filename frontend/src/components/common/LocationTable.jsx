import {TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Table} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const LocationTable = ({locations, headers,onDelete,onEdit}) => {
    return (

        <TableContainer component={Paper} sx={{
            width: '1000px',

        }}>

            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((header) => <TableCell align="center">{header}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {locations.map((location, index) => (
                        <TableRow
                            key={location._id}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'secondary.main',
                                }
                            }}
                        >
                            <TableCell align="center">{index}</TableCell>
                            <TableCell align="center">{location.name}</TableCell>

                            <TableCell align="center"><IconButton
                                onClick={()=>onEdit(location._id)}><ModeEditIcon/></IconButton></TableCell>
                            <TableCell align="center"><IconButton onClick={() => onDelete(location._id)}><DeleteIcon/></IconButton></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )


}

export default LocationTable;