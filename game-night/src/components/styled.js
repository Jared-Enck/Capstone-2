import { NavLink } from "react-router-dom";
import { 
  Grid, 
  Container,
  InputBase,
  alpha,
  Typography,
  Button,
  Box,
  OutlinedInput
} from "@mui/material";
import styled from "@mui/styled-engine-sc";
import theme from "../theme";

// Navbar
export const StyledGrid = styled(Grid)`
  grid-template-rows: auto;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
`;

export const StyledContainer = styled(Container)`
  background-color: ${theme.palette.secondary.main};
  height: 4rem;
`;

export const Brand = styled(Typography)(() => ({
  marginLeft: '2rem',
  fontSize: '1.7rem',
  color: theme.palette.primary.main
}));

export const StyledNavLink = styled(NavLink)`
  color: inherit;
  margin-right: 2rem;
  :hover {
    color: ${theme.palette.primary.main}
  }
`;

export const Search = styled('div')(() => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

export const SearchIconWrapper = styled('div')(() => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(() => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
    '&:focus': {
      borderInline: 'none',
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: theme.shape.borderRadius,
    }
  },
}));

// Forms
export const FormBox = styled(Box)(() => ({
  padding: '2rem',
  maxWidth: '500px',
  backgroundColor: theme.palette.secondary.main,
  borderRadius: theme.shape.borderRadius,
  boxShadow: `.5rem .3rem .3rem ${
    alpha(theme.palette.common.black, .2)
  }`
}));

export const FormOutlinedInput = styled(OutlinedInput)(() => ({
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
}));

// Misc
export const PrimaryButton = styled(Button)(() => ({
  borderRadius: '9999px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

export const ErrorSpan = styled('span')(() => ({
  color: theme.palette.error.main
}));