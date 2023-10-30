import React from 'react';
import {
  Dialog,
  DialogTitle,
  Card,
  CardMedia,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function VideoPlayer({
  open,
  video,
  handleClose,
  isSmallScreen,
}) {
  return (
    <Dialog
      fullScreen={isSmallScreen}
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': {
          bgcolor: 'primary.dark',
        },
      }}
      maxWidth={'xl'}
      fullWidth
    >
      {isSmallScreen ? (
        <DialogTitle
          sx={{
            padding: 0,
            display: 'flex',
          }}
        >
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              color: 'primary.muted',
              marginLeft: 'auto',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      ) : null}
      <Card
        sx={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%',
          borderRadius: isSmallScreen ? 0 : null,
          display: 'flex',
        }}
      >
        <CardMedia
          component={'iframe'}
          src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
          title={video.snippet.title}
          allowFullScreen
          allow='accelerometer; 
              autoplay; 
              encrypted-media; 
              gyroscope; 
              picture-in-picture'
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: 0,
          }}
        />
      </Card>
    </Dialog>
  );
}
