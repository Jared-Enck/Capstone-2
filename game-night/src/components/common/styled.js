import { Box, Button, alpha, TextField, ListItemIcon } from '@mui/material';
import styled from '@emotion/styled';

// ******************************************** Forms

export const FormBox = styled(Box)(() => ({
  maxWidth: '400px',
  margin: 'auto',
}));

export const FormTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.light, 0.45),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.text,
  '&: hover': {
    backgroundColor: alpha(theme.palette.primary.light, 0.7),
  },
  '& label': {
    color: theme.palette.primary.muted,
  },
  '& label.Mui-focused': {
    color: theme.palette.primary.contrastText,
  },
  '& .MuiOutlinedInput-root': {
    color: theme.palette.primary.text,
  },
  '& .MuiOutlinedInput-root.Mui-focused': {
    '& > fieldset': {
      borderColor: theme.palette.primary.contrastText,
    },
  },
}));

export const ErrorSpan = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
  textAlign: 'center',
}));

// ******************************************** Buttons

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.contrastText, 0.8),
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.contrastText,
  },
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.primary.muted,
  color: theme.palette.primary.muted,
  '&:hover': {
    borderColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.contrastText,
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
