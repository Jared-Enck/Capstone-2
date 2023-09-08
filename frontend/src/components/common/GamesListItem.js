import React from 'react';
import {
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Avatar,
  Typography,
  alpha,
  Grid,
} from '@mui/material';
import styled from '@emotion/styled';

const StyledListButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isLastItem',
})(({ isLastItem, theme }) => ({
  padding: '.3rem .3rem',
  fontSize: '.7rem',
  borderRadius: isLastItem ? '0px 0px 6px 6px' : null,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.4),
    borderRadius: isLastItem ? '0px 0px 6px 6px' : null,
  },
}));

export default function GamesListItem({
  item,
  idx,
  clickFunc,
  isLastItem,
  dimensions = {
    width: '2.2rem',
    height: '2.2rem',
    fontSize: 'h6',
  },
  homepage,
}) {
  const titleMaxWidth = homepage ? '80ch' : '47ch';
  return (
    <StyledListButton
      alignitems={'flex-start'}
      key={item.id}
      onClick={() => clickFunc(idx, item.id)}
      isLastItem={isLastItem}
    >
      {item.thumbnail ? (
        <ListItemAvatar sx={{ marginRight: 2 }}>
          <Avatar
            variant='rounded'
            sx={{
              height: dimensions.height,
              width: dimensions.width,
            }}
            alt={item.name}
            src={item.thumbnail}
          />
        </ListItemAvatar>
      ) : null}
      <ListItemText>
        <Grid
          container
          direction={'row'}
          spacing={2}
        >
          <Grid
            item
            sx={{ maxWidth: titleMaxWidth }}
          >
            <Typography
              variant={dimensions.fontSize}
              noWrap
              sx={{
                color: 'primary.text',
              }}
            >
              {item.name}
            </Typography>
          </Grid>
          <Grid
            item
            alignSelf={'center'}
          >
            <Typography
              variant={dimensions.fontSize}
              noWrap
              sx={{
                color: 'primary.muted',
              }}
            >
              {`( ${item.yearpublished} )`}
            </Typography>
          </Grid>
        </Grid>
      </ListItemText>
    </StyledListButton>
  );
}
