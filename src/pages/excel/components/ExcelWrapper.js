import React from 'react';
import { Box} from '@mui/material';
import Uploader from './Uploader';
import ListHeader from './ListHeader';
import TableWrapper from './TableWrapper';


const ExcelWrapper = () => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 3,
        mt:2,
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: 2,
        width: '100%',
        textAlign: 'center',
        bgcolor: 'background.paper',
        boxShadow: 3,
      }}
    >
    <Uploader />
    <ListHeader />
    <TableWrapper />
    </Box>
  );
};

export default ExcelWrapper;
