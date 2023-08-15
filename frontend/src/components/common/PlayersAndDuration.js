import React, { useCallback, useMemo } from 'react';
import { Grid, Typography } from '@mui/material';
import { Person, AccessTime } from '@mui/icons-material';
import styled from '@emotion/styled';

const StyledTypography = styled(Typography)(({ theme }) => ({
  alignItems: 'flex-start',
}));

export default function PlayersAndDuration({
  min_players,
  max_players,
  min_playtime,
  max_playtime,
}) {
  /** format string for num of players to only display
   * min_players if it's equal to max_players
   *
   * some API data with have min and max as same value
   *
   * instead of displaying players as 1-1,
   * will just have display of 1
   *
   */
  const getPlayers = useCallback(() => {
    return min_players === max_players
      ? min_players
      : min_players + ' - ' + max_players;
  }, [min_players, max_players]);

  const players = useMemo(() => getPlayers(), [getPlayers]);

  /** format string for duration of playtime to only display
   * min_playtime if it's equal to max_playtime
   *
   * some API data with have min and max as same value
   *
   * instead of displaying playtime as 30-30,
   * will just have display of 30
   *
   */
  const getDuration = useCallback(() => {
    return min_playtime === max_playtime
      ? min_playtime
      : min_playtime + ' - ' + max_playtime;
  }, [min_playtime, max_playtime]);

  const duration = useMemo(() => getDuration(), [getDuration]);

  return (
    <>
      <Grid item>
        <StyledTypography>
          <Person />
          {players}
        </StyledTypography>
      </Grid>
      <Grid item>
        <StyledTypography>
          <AccessTime sx={{ marginRight: '.3rem', transform: 'scale(.85)' }} />
          {duration}
        </StyledTypography>
      </Grid>
    </>
  );
}
