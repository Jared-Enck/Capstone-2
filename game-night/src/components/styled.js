import {
  Box,
  Button,
  alpha,
  TextField,
  ListItemIcon,
  Grid,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import bgImage from '../images/aksel-fristrup-w7eaCH6ShR4-unsplash.jpg';

// ******************************************** App

export const Background = styled('div')({
  position: 'fixed',
  backgroundImage: `url(${bgImage})`,
  width: '100%',
  height: '100%',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: -1,
});

// ******************************************** Navbar

export const StyledGrid = styled(Grid)(() => ({
  gridTemplateRows: 'auto',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  fontSize: '1.2rem',
}));

export const Brand = styled(Typography)(({ theme }) => ({
  marginLeft: '2rem',
  fontSize: '1.7rem',
  color: theme.palette.secondary.main,
}));

// ******************************************** Forms

export const FormBox = styled(Box)(() => ({
  maxWidth: '400px',
  margin: 'auto',
}));

export const FormTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.dark, 0.45),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.text,
  '&: hover': {
    backgroundColor: alpha(theme.palette.primary.dark, 0.7),
  },
  '& label': {
    color: theme.palette.primary.muted,
  },
  '& label.Mui-focused': {
    color: theme.palette.secondary.main,
  },
  '& .MuiOutlinedInput-root': {
    color: theme.palette.primary.text,
  },
  '& .MuiOutlinedInput-root.Mui-focused': {
    '& > fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
}));

export const ErrorSpan = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
  textAlign: 'center',
}));

// ******************************************** Buttons

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.primary.muted,
  color: theme.palette.primary.muted,
  '&:hover': {
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
  },
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgb(220,0,0)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'red',
  },
}));

// ******************************************** Icons

export const StyledIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.text,
}));
