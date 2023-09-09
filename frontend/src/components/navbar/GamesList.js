import React, { Suspense } from 'react';
import { List } from '@mui/material';
import CircularLoading from '../common/CircularLoading';
import GamesListItem from '../common/GamesListItem';

export default function GamesList({ games, handleGameClick }) {
  return (
    <List sx={{ width: '100%', paddingBottom: '0' }}>
      <Suspense fallback={<CircularLoading size={'1.5rem'} />}>
        {games.length
          ? games.map((i) => (
              <GamesListItem
                key={games[i].id}
                item={games[i]}
                clickFunc={handleGameClick}
                isLastItem={i === games.length - 1}
              />
            ))
          : null}
      </Suspense>
    </List>
  );
}
