import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const TextInput = () => {
    return ( 
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField label="ID" id="outlined-size-small" defaultValue="Small" size="small"
          />
        </div>
      </Box>
     );
}
 
export default TextInput;