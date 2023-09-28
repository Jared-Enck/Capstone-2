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
})(({ isLastItem, homepage, theme }) => ({
  padding: '.3rem .3rem',
  fontSize: '.7rem',
  color: theme.palette.primary.text,
  width: '100%',
  borderRadius: isLastItem ? '0px 0px 6px 6px' : null,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
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
  isSmallScreen,
}) {
  const { name, thumbnail, yearpublished } = item;
  return (
    <StyledListButton
      alignitems={'flex-start'}
      onClick={() => clickFunc(item.id)}
      isLastItem={isLastItem}
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
        <Box
          sx={{
            display: 'flex',
            color: homepage ? 'white' : 'inherit',
            textShadow: homepage ? `1px 1px 1px rgba(0,0,0,.5)` : 'none',
          }}
        >
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
