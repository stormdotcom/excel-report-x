import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination,
  Typography,
} from '@mui/material';


const MuiJsonTableWithPagination = ({ jsonData =[], title}) => {
  const [page, setPage] = useState(0); 
  const rowsPerPage = 15; 


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = jsonData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper>
        <Typography variant='body1'>{title}</Typography>
      <TableContainer>
        <Table aria-label={title}>
          <TableHead>
            <TableRow>
              {Object.keys(jsonData[0]).map((key, idx) => (
                <TableCell key={key+idx} align="left">
                 
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, idx) => (
              <TableRow key={idx}>
       
                {Object.values(row).map((value, index) => (
                  <TableCell key={value+index} align="left">
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={jsonData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[50]}
      />
    </Paper>
  );
};

export default MuiJsonTableWithPagination;
