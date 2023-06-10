import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Stack } from '@mui/material';



function SnackBar(props) {

    console.log('its snack barrr',props);
    const {severity,message,snackOpen,setSnackOpen}=props

    console.log(snackOpen,'sanckOpen');
   

    const handleClick=()=>{
        setSnackOpen(true)
    }
    const handleClose = (event,reason)=>{
        if(reason=='clickaway'){
            return
        }
        setSnackOpen(false) 
    }

    React.useEffect(() => {
        if (severity && message) {
          handleClick();
        }
      }, [severity, message]);

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
    {/* <Button variant="outlined" onClick={handleClick}>
      Open success snackbar
    </Button> */}
    <Snackbar open={snackOpen}  autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
    {/* <Alert severity="error">This is an error message!</Alert>
    <Alert severity="warning">This is a warning message!</Alert>
    <Alert severity="info">This is an information message!</Alert>
    <Alert severity="success">This is a success message!</Alert> */}
  </Stack>
  )
}

export default SnackBar
