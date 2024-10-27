import React from 'react'
import MuiJsonTableWithPagination from '../../../common/component/Table'
import { useSelector } from 'react-redux'
import { STATE_SLICE_KEY } from '../constants'
import { Box } from '@mui/material'

const TableWrapper = () => {
    const data = useSelector(s => s[STATE_SLICE_KEY].dataValues);
    const file = useSelector(s => s[STATE_SLICE_KEY].file)
  return (
    <Box >
     {data.length > 1 &&   <MuiJsonTableWithPagination title={file?.name || ""} jsonData={data} />}

    </Box>
  )
}

export default TableWrapper