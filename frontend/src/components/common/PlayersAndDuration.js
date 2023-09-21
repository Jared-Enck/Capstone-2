import React from 'react';
import { Grid, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Person, AccessTime } from '@mui/icons-material';

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
  const players = () => {
    const players =
      min_players === max_players
        ? min_players
        : min_players + ' - ' + max_players;
    return [<Person />, players];
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
    return [<AccessTime />, duration];
  };

  return (
    <>
      {[players(), duration()].map((i, idx, arr) => {
        const last = arr.length - 1;
        return (
          <Grid
            item
            key={idx}
          >
            <ListItem
              disableGutters
              sx={{ marginRight: idx === last ? 0 : 2 }}
            >
              <ListItemIcon sx={{ color: 'primary.text', minWidth: 30 }}>
                {i[0]}
              </ListItemIcon>
              <ListItemText>{i[1]}</ListItemText>
            </ListItem>
          </Grid>
        );
      })}
    </>
  );
}
