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
  borderRadius: theme.shape.borderRadius,
  border: "1px solid black",
  position: "absolute",
  zIndex: 2
}));

export default function SearchBoxResults({ results, clearBoxResults }) {
  const navigate = useNavigate();
  const mechanics = results.foundMechanics || [];
  const categories = results.foundCategories || [];
  const games = results.foundGames || [];

  const {
    setGame,
    setOpen,
    setBoxResults,
    getSearchResults
  } = useContext(DataContext);

  const handleBtnClick = (path, item) => {
    setOpen(false);
    setBoxResults({});
    getSearchResults({ path, item });
    navigate('/search/results');
  };

  const handleGameClick = (idx, gameID) => {
    setGame(games[idx]);
    navigate(`/games/${gameID}`);
    clearBoxResults();
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
                handleClick={handleBtnClick}
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
                handleClick={handleBtnClick}
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
                games={games}
                handleGameClick={handleGameClick}
              />
            )
            : null
        }
      </Stack>
    </StyledBox>
  );
};