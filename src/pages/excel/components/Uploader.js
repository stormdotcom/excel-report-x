import React, { useState } from 'react';
import { Box, Button, Typography, IconButton, CircularProgress } from '@mui/material';
import { UploadFile, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { STATE_SLICE_KEY } from '../constants';
import { actions } from '../slice';

const Uploader = () => {
  const [worker, setWorker] = useState(null);
  const {file, loading} = useSelector(s => s[STATE_SLICE_KEY])
  const dispatch = useDispatch();

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const { name, size, type, lastModified } = uploadedFile;
      const fileData = { name, size, type, lastModified };
      dispatch(actions.setFile(fileData));
      parseExcelFile(uploadedFile);
    }
  };

  const parseExcelFile = async (file) => {
    dispatch(actions.setLoading(true));
    const worker = new Worker(new URL('../excelWorker.js', import.meta.url), { type: 'module' });

    worker.onmessage = (e) => {
      const { headers, jsonData } = e.data;

      dispatch(actions.setChips(headers));
      dispatch(actions.setValues(jsonData));
      dispatch(actions.setLoading(false));
  
      worker.terminate();
    };
  
    worker.postMessage(file);
  }

  const handleFileRemove = () => {
    dispatch(actions.clearAll());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 3,
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: 2,
        width: '100%',
        maxWidth: 400,
        textAlign: 'center',
        bgcolor: 'background.paper',
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Excel Uploader
      </Typography>

      <Button
        variant="contained"
        component="label"
        startIcon={<UploadFile />}
        color="primary"
        disabled={loading}
      >
        {file ? 'Change File' : 'Upload Excel File'}
        <input type="file" hidden onChange={handleFileUpload} accept=".xlsx, .xls" />
      </Button>

      {loading && <CircularProgress color="primary" />}

      {file && !loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2" color="textSecondary">
            {file.name}
          </Typography>
          <IconButton color="error" onClick={handleFileRemove} sx={{ ml: 1 }}>
            <Delete />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Uploader;
