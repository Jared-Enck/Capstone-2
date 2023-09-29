import React from 'react';
import {
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Avatar,
  Typography,
  alpha,
  Box,
} from '@mui/material';
import styled from '@emotion/styled';

const StyledListButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isLastItem',
})(({ isLastItem, theme }) => ({
  padding: '.3rem .3rem',
  fontSize: '.7rem',
  width: '100%',
  borderRadius: isLastItem ? '0px 0px 6px 6px' : null,
  transition: '150ms ease-out',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    color: theme.palette.secondary.main,
    borderRadius: isLastItem ? '0px 0px 6px 6px' : null,
    transition: '200ms ease-in',
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
  hotListItem,
  isSmallScreen,
}) {
  const { name, thumbnail, yearpublished } = item;
  return (
    <StyledListButton
      alignitems={'flex-start'}
      onClick={() => clickFunc(item.id)}
      isLastItem={isLastItem}
      sx={{
        color: hotListItem ? '#FAF9F6' : 'inherit',
        textShadow: hotListItem ? `1px 1px 1px rgba(0,0,0,.5)` : 'none',
      }}
    >
      {thumbnail ? (
        <ListItemAvatar sx={{ marginRight: isSmallScreen ? -1 : 2 }}>
          <Avatar
            variant='rounded'
            sx={{
              height: dimensions.height,
              width: dimensions.width,
            }}
            alt={name}
            src={thumbnail}
          />
        </ListItemAvatar>
      ) : null}
      <ListItemText>
        <Box sx={{ display: 'flex' }}>
          <Typography
            variant={dimensions.fontSize}
            noWrap
            sx={{
              maxWidth: isSmallScreen ? '72%' : '85%',
              flexGrow: 1,
            }}
          >
            {name}
          </Typography>
          <Typography variant={dimensions.fontSize}>
            {`( ${yearpublished ? yearpublished : 'N/A'} )`}
          </Typography>
        </Box>
      </ListItemText>
    </StyledListButton>
  );
}
