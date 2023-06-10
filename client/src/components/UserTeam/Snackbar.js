import React from 'react'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'

function Snackbar(props) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
    <Button variant="outlined" onClick={handleClick}>
      Open {severity} snackbar
    </Button>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  </Stack>
  )
}

export default Snackbar
