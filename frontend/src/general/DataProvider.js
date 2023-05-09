import React, { useContext, useState, useEffect} from "react";
import DataContext from "./DataContext";

export default function DataProvider({children}) {
  const [searchTerms, setSearchTerms] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  
  
  return (
    <DataContext.Provider
      value={
        {

        }
      }
    >
      { children }
    </DataContext.Provider>
  );
};