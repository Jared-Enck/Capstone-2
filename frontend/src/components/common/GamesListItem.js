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
  id,
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
  const { name, thumbnail, yearpublished } = item;
  const nameVal = name._attributes.value;
  const thumbnailVal = item.thumbnail ? thumbnail._attributes.value : '';
  const yearVal = yearpublished._attributes.value;
  return (
    <StyledListButton
      alignitems={'flex-start'}
      onClick={() => clickFunc(id)}
      isLastItem={isLastItem}
    >
      {thumbnailVal ? (
        <ListItemAvatar sx={{ marginRight: 2 }}>
          <Avatar
            variant='rounded'
            sx={{
              height: dimensions.height,
              width: dimensions.width,
            }}
            alt={nameVal}
            src={thumbnailVal}
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
              {nameVal}
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
              {`( ${yearVal} )`}
            </Typography>
          </Grid>
        </Grid>
      </ListItemText>
    </StyledListButton>
  );
}
