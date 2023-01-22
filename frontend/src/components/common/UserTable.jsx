import {TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Table} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const UserTable = ({users, headers,onDelete,onEdit}) => {
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
                    {users.map((user, index) => (
                        <TableRow
                            key={user._id}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'secondary.main',
                                }
                            }}
                        >
                            <TableCell align="center">{index}</TableCell>
                            <TableCell align="center">{user.name}</TableCell>
                            <TableCell align="center">{user.lastname}</TableCell>
                            <TableCell align="center">{user.username}</TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">{user.role}</TableCell>

                            <TableCell align="center"><IconButton
                                onClick={()=>onEdit(user._id)}><ModeEditIcon/></IconButton></TableCell>
                            <TableCell align="center"><IconButton onClick={() => onDelete(user._id)}><DeleteIcon/></IconButton></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )


}

export default UserTable;