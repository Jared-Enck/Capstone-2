import React, { Suspense, useContext } from 'react';
import DataContext from '../../context/DataContext';
import { List } from '@mui/material';
import CircularLoading from '../common/CircularLoading';
import GamesListItem from '../common/GamesListItem';

export default function GamesList({ games, handleGameClick }) {
  const { isSmallScreen } = useContext(DataContext);
  return (
    <List sx={{ width: '100%', paddingBottom: '0' }}>
      <Suspense fallback={<CircularLoading size={'1.5rem'} />}>
        {games.map((i, idx) => (
          <GamesListItem
            key={i.id}
            item={i}
            clickFunc={handleGameClick}
            dimensions={{ fontSize: isSmallScreen ? '.9rem' : '1.2rem' }}
            isLastItem={idx === games.length - 1}
            isSmallScreen={isSmallScreen}
          />
        ))}
      </Suspense>
    </List>
  );
}
