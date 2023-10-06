import React from 'react';
import {
  Stack,
  Avatar,
  Box,
  Button,
  InputLabel,
  TextField,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

export default function EditAvatar({
  avatarSize,
  imageURL,
  handleFileUpload,
  isSmallScreen,
}) {
  return (
    <Stack direction={'row'}>
      <Avatar
        src={imageURL}
        sx={{
          width: avatarSize.width,
          height: avatarSize.height,
        }}
      />
      <Box sx={{ marginTop: 'auto', marginLeft: 'auto' }}>
        <InputLabel
          htmlFor='imageURL'
          sx={{ padding: '.3rem', borderRadius: 9999 }}
        >
          <Button
            variant='contained'
            component='span'
            className='main-button'
            size={isSmallScreen ? 'small' : 'medium'}
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
    </Stack>
  );
}
