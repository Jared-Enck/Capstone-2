import React, { useCallback, useMemo } from "react";
import {
  Grid,
  Typography
} from "@mui/material"
import {
  Person,
  AccessTime,
} from "@mui/icons-material";
import styled from "@emotion/styled";

const StyledTypography = styled(Typography)(({ theme }) => ({
  alignItems: "flex-start"
}));

export default function PlayersAndDuration({
  min_players,
  max_players,
  min_playtime,
  max_playtime
}) {
  const getPlayers = useCallback(() => {
    return (
      min_players === max_players
      ? min_players 
      : (min_players + " - " + max_players)
    );
  });
  const players = useMemo(() => getPlayers());
  const getDuration = useCallback(() => {
    return(
      min_playtime === max_playtime
      ? min_playtime
      : (min_playtime + " - " + max_playtime)
    );
  });
  const duration = useMemo(() => getDuration());
  return(
    <>
      <Grid item>
        <StyledTypography>
          <Person />
          {players}
        </StyledTypography>
      </Grid>
      <Grid item>
        <StyledTypography>
          <AccessTime sx={{marginRight: ".3rem", transform: "scale(.85)"}}/>
          {duration}
        </StyledTypography>
      </Grid>
    </>
  );
};