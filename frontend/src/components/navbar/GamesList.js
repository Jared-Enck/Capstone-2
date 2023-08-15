import React, { Suspense } from 'react';
import {
  List,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Avatar,
} from '@mui/material';
import CircularLoading from '../common/CircularLoading';
import styled from '@emotion/styled';

const StyledListButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isLastItem',
})(({ isLastItem, theme }) => ({
  padding: '.3rem .3rem',
  fontSize: '.7rem',
  borderRadius: isLastItem ? '0px 0px 6px 6px' : null,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    borderRadius: isLastItem ? '0px 0px 6px 6px' : null,
  },
}));

export default function GamesList({ games, handleGameClick }) {
  const GamesListItem = ({ item, idx }) => {
    return (
      <StyledListButton
        alignitems={'flex-start'}
        key={item.id}
        onClick={() => handleGameClick(idx, item.id)}
        isLastItem={idx === games.length - 1}
      >
        <ListItemAvatar>
          <Avatar
            sx={{
              height: '2.2rem',
              width: '2.2rem',
              borderRadius: '3px',
            }}
            alt={item.name}
            src={item.images['thumb']}
          />
        </ListItemAvatar>
        <ListItemText
          color='primary.text'
          sx={{
            alignSelf: 'center',
            paddingRight: '.5rem',
            margin: '0',
            marginLeft: '-.3rem',
            color: 'primary.text',
          }}
        >
          {item.name}
        </ListItemText>
      </StyledListButton>
    );
  };

  return (
    <List sx={{ width: '100%', paddingBottom: '0' }}>
      <Suspense fallback={<CircularLoading size={'1.5rem'} />}>
        {games.length
          ? games.map((i, idx) => (
              <GamesListItem
                key={idx}
                item={i}
                idx={idx}
              />
            ))
          : null}
      </Suspense>
    </List>
  );
}
