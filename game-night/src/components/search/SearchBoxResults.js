import React, { useState, useContext } from "react";
import SearchBoxSection from "./SearchBoxSection";
import { 
  Box,
  Stack,
  Divider
} from "@mui/material";
import DataContext from "../../context/DataContext";
import theme from "../../theme";

export default function SearchBoxResults({
  results,
  setSearchTerm,
  setSearchResults
}) {
  const {
    foundMechanics,
    foundCategories,
    foundGames
  } = results;
  const {setRefinedSearch} = useContext(DataContext);

  const handleClick = (path, id) => {
    setSearchTerm('');
    setRefinedSearch({path,id});
    setSearchResults('');
  };
  
  return (
    <Box sx={{
      marginTop: 1,
      width: 328,
      backgroundColor: theme.palette.primary.light,
      position: "absolute",
      zIndex: 1
    }}>
      <Stack>
        <SearchBoxSection 
          sectionName={"Mechanics"} 
          items={foundMechanics}
          handleClick={handleClick}
        />
        <SearchBoxSection 
          sectionName={"Categories"} 
          items={foundCategories}
          handleClick={handleClick}
        />
        <Divider />
        <SearchBoxSection 
          items={foundGames}
          handleClick={handleClick}
        />
      </Stack>
    </Box>
  );
};