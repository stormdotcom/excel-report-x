import React from 'react';
import { Chip, Box } from '@mui/material';
import { STATE_SLICE_KEY } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../slice';

const ListHeader = () => {
  const dispatch = useDispatch();
  const chips = useSelector(s => s[STATE_SLICE_KEY].chips);
  const dataValues = useSelector(s => s[STATE_SLICE_KEY].dataValues);
  const handleDelete = (chipToDelete) => () => {
    const newChips = chips.filter((chip) => chip !== chipToDelete);
    const columnIndex = chips.indexOf(chipToDelete);
    if (columnIndex === -1) return;
    // find the column which match chipToDelete, delete entire column
    const newValues = dataValues.map((row) =>
        row.filter((_, index) => index !== columnIndex)
      );
    dispatch(actions.setValues(newValues))
    dispatch(actions.setChips(newChips));
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 1, 
        overflowY: 'scroll', 
        whiteSpace: 'nowrap', 
        padding: 1 ,
        width:"99vw"
      }}
    >
      {chips.map((chip) => (
        <Chip
          key={chip}
          label={chip}
          onDelete={handleDelete(chip)}
          sx={{ backgroundColor: '#7369ed', color:"#ffff" }}
        />
      ))}
    </Box>
  );
};

export default ListHeader;
