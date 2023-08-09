import React from 'react';
import { Grid, Avatar, Box, Button } from '@mui/material';
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
          <label htmlFor='imageURL'>
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
            <input
              id='imageURL'
              accept='image/*'
              type='file'
              hidden
              onChange={handleFileUpload}
            />
          </label>
        </Box>
      </Grid>
    </Grid>
  );
}
