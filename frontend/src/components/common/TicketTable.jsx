import {TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Table} from "@mui/material";


const TicketTable = ({tickets, headers}) => {
    return (

        <TableContainer component={Paper} sx={{
            width: '1000px'}}>

            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((header) => <TableCell align="center">{header}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets.map((ticket) => (
                        <TableRow
                            key={ticket._id}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'secondary.main',
                                }
                            }}
                        >
                            <TableCell align="center">{ticket._id}</TableCell>
                            <TableCell align="center">{ticket.building}</TableCell>
                            <TableCell align="center">{ticket.activated === true ?'Si':'No'}</TableCell>
                            <TableCell align="center"><img width="160px" height="160px" src={ticket.url} alt="QR"/> </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )


}

export default TicketTable;