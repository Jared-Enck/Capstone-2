import React from 'react';
import { Grid, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Person, AccessTime } from '@mui/icons-material';

export default function PlayersAndDuration({
  min_players,
  max_players,
  min_playtime,
  max_playtime,
  isMediumScreen,
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
  const players = () => {
    const players =
      min_players === max_players
        ? min_players
        : min_players + ' - ' + max_players;
    return [<Person fontSize={isMediumScreen ? 'small' : 'medium'} />, players];
  };

  /** format string for duration of playtime to only display
   * min_playtime if it's equal to max_playtime
   *
   * some API data with have min and max as same value
   *
   * instead of displaying playtime as 30-30,
   * will just have display of 30
   *
   */
  const duration = () => {
    const duration =
      min_playtime === max_playtime
        ? min_playtime
        : min_playtime + ' - ' + max_playtime;
    return [
      <AccessTime fontSize={isMediumScreen ? 'small' : 'medium'} />,
      duration,
    ];
  };

  return (
    <>
      {[players(), duration()].map((i, idx, arr) => {
        return (
          <Grid
            item
            key={idx}
          >
            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon
                sx={{
                  color: 'primary.text',
                  minWidth: isMediumScreen ? 20 : 30,
                }}
              >
                {i[0]}
              </ListItemIcon>
              <ListItemText sx={{ fontSize: '.5rem' }}>{i[1]}</ListItemText>
            </ListItem>
          </Grid>
        );
      })}
    </>
  );
}
