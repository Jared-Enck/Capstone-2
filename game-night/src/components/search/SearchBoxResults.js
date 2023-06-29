import React, { useContext, lazy } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Divider
} from "@mui/material";
import styled from "@emotion/styled";
import DataContext from "../../context/DataContext";

const SearchBoxSectionComp = lazy(
  () => import("./SearchBoxSection")
);

const GamesListComp = lazy(
  () => import("./GamesList")
);

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: '.3rem',
  width: '100%',
  backgroundColor: theme.palette.primary.light,
  borderRadius: ".3rem",
  position: "absolute",
  zIndex: 2
}));

export default function SearchBoxResults({ results, clearSearch }) {
  const navigate = useNavigate();
  const mechanics = results.foundMechanics;
  const categories = results.foundCategories;
  const games = results.foundGames;
  
  const {
    setRefinedSearch,
    setGameID,
    setGame
  } = useContext(DataContext);

  const handleClick = (path, id) => {
    setRefinedSearch({ path, id });
    navigate('/search/results');
    clearSearch();
  };

  const handleGameClick = (idx, gameID) => {
    setGameID(gameID);
    setGame(games[idx]);
    navigate(`/games/${gameID}`);
    clearSearch();
  };

  return (
    <StyledBox sx={{ boxShadow: 2 }}>
      <Stack>
        {
          mechanics.length
            ? (
              <SearchBoxSectionComp
                sectionName={"Mechanics"}
                items={mechanics}
                handleClick={handleClick}
              />
            )
            : null
        }
        {
          categories.length
            ? (
              <SearchBoxSectionComp
                sectionName={"Categories"}
                items={categories}
                handleClick={handleClick}
              />
            )
            : null
        }
        {
          mechanics.length || categories.length
            ? <Divider />
            : null
        }
        {
          games.length
            ? (
              <GamesListComp
                items={games}
                handleGameClick={handleGameClick}
              />
            )
            : null
        }
      </Stack>
    </StyledBox>
  );
};