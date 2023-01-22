import {TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Table} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';



const VisitTable = ({visits, headers,onDelete}) => {
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
                    {visits.map((visit, index) => (
                        <TableRow
                            key={visit._id}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'secondary.main',
                                }
                            }}
                        >
                            <TableCell align="center">{visit.ci}</TableCell>
                            <TableCell align="center">{visit.name}</TableCell>
                            <TableCell align="center">{visit.lastname}</TableCell>
                            <TableCell align="center">{visit.phone}</TableCell>
                            <TableCell align="center">{visit.pass}</TableCell>
                            <TableCell align="center">{visit.office}</TableCell>
                            <TableCell align="center">{visit.flat}</TableCell>
                            <TableCell align="center">{visit.host}</TableCell>
                            <TableCell align="center">{visit.date}</TableCell>
                            <TableCell align="center"><IconButton onClick={() => onDelete(visit._id)}><DeleteIcon/></IconButton></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )


}

export default VisitTable;