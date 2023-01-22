import {TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Table} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const OfficeTable = ({offices, headers,onDelete,onEdit}) => {
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
                    {offices.map((office, index) => (
                        <TableRow
                            key={office._id}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'secondary.main',
                                }
                            }}
                        >
                            <TableCell align="center">{index}</TableCell>
                            <TableCell align="center">{office.name}</TableCell>
                            <TableCell align="center">{office.building}</TableCell>
                            <TableCell align="center">{office.acronym}</TableCell>
                            <TableCell align="center">{office.flat}</TableCell>
                            <TableCell align="center">{office.phone}</TableCell>


                            <TableCell align="center"><IconButton
                                onClick={()=>onEdit(office._id)}><ModeEditIcon/></IconButton></TableCell>
                            <TableCell align="center"><IconButton onClick={() => onDelete(office._id)}><DeleteIcon/></IconButton></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )


}

export default OfficeTable;