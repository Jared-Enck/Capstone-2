import React from 'react';
import {
  Grid,
  Avatar,
  Box,
  Button,
  InputLabel,
  TextField,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

export default function EditAvatar({ imageURL, handleFileUpload }) {
  return (
    <Grid
      container
      direction={'row'}
      justifyContent={'space-between'}
    >
      <Grid item>
        <Avatar
          src={imageURL}
          sx={{
            width: 120,
            height: 120,
          }}
        />
      </Grid>
      <Grid
        item
        sx={{ display: 'flex' }}
      >
        <Box sx={{ marginTop: 'auto' }}>
          <InputLabel
            htmlFor='imageURL'
            sx={{ padding: '.3rem', borderRadius: 9999 }}
          >
            <Button
              variant='contained'
              component='span'
              className='main-button'
              sx={{
                bgcolor: 'primary.dark',
                '&:hover': {
                  bgcolor: 'secondary.main',
                  color: 'primary.main',
                },
              }}
            >
              <PhotoCamera
                fontSize='small'
                sx={{ marginRight: 1 }}
              />
              Upload Image
            </Button>
            <TextField
              id='imageURL'
              type='file'
              onChange={handleFileUpload}
              sx={{ display: 'none' }}
            />
          </InputLabel>
        </Box>
      </Grid>
    </Grid>
  );
}
