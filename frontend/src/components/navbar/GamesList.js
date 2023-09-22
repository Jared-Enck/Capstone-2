import React, { Suspense } from 'react';
import { List, Typography, ListItemText } from '@mui/material';
import CircularLoading from '../common/CircularLoading';
import GamesListItem from '../common/GamesListItem';

export default function GamesList({ games, handleGameClick }) {
  return (
    <List sx={{ width: '100%', paddingBottom: '0' }}>
      <Suspense fallback={<CircularLoading size={'1.5rem'} />}>
        {games.map((i, idx) => (
          <GamesListItem
            key={i.id}
            item={i}
            clickFunc={handleGameClick}
            isLastItem={idx === games.length - 1}
          />
        ))}
      </Suspense>
    </List>
  );
}
