import { NavLink } from "react-router-dom";
import { 
  Grid, 
  Container
} from "@mui/material";
import styled from "@mui/styled-engine-sc";
import theme from "../theme"

export const StyledGrid = styled(Grid)`
  grid-template-rows: auto;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
`;
export const StyledContainer = styled(Container)`
  background-color: rgba(0,0,0,.2);
  height: 4rem;
`;

export const StyledNavLink = styled(NavLink)`
  color: inherit;
  margin-right: 2rem;
  :hover {
    color: ${theme.palette.primary.main}
  }
`;