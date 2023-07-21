import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from '../../context/UserContext';
import {
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  Stack,
  Box,
  Button,
  alpha,
  Typography,
  OutlinedInput
} from "@mui/material";
import styled from "@emotion/styled";
import ContentContainer from "../common/ContentContainer";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useFields from "../../hooks/useFields";

export const FormBox = styled(Box)(() => ({
  maxWidth: '400px',
  margin: 'auto'
}));

export const FormOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.light, 0.45),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.text,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.light, .7),
  },
  '& .MuiInputBase-outlined': {
    '&:focus': {
      borderColor: theme.palette.primary.contrastText
    }
  }
}));

export const FormInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.primary.muted
}));

export const PrimaryButton = styled(Button)(({ theme }) => ({
  borderRadius: '9999px',
  backgroundColor: alpha(theme.palette.primary.contrastText, .8),
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.contrastText
  }
}));

export const ErrorSpan = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
  textAlign: "center"
}));

const genError = (err, idx) => {
  return (
    <ErrorSpan key={idx}>
      {err}
    </ErrorSpan>
  )
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const initialState = {
    username: '',
    password: ''
  };
  const [
    formData,
    handleChange,
    formErrors,
    setFormErrors
  ] = useFields(initialState);

  const { loginUser, navigate } = useContext(UserContext);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await loginUser(formData)
    if (result.msg === 'success') {
      navigate('/');
    } else {
      setFormErrors(result.msg)
    }
  }

  return (
    <Stack>
      <ContentContainer>
        <FormBox
          component="form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Stack spacing={2}>
            <FormControl>
              <FormInputLabel
                htmlFor="username"
              >
                Username
              </FormInputLabel>
              <FormOutlinedInput
                type="text"
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoFocus
              />
            </FormControl>

            <FormControl>
              <FormInputLabel
                htmlFor="password"
              >
                Password
              </FormInputLabel>
              <FormOutlinedInput
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <Stack spacing={2}>
                {
                  formErrors.length
                    ? formErrors.map((e, idx) => genError(e, idx))
                    : null
                }
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "primary.text"
                  }}
                >
                  Don't have an account? Sign up {' '}
                  <Link to={"/signup"}>
                    here.
                  </Link>
                </Typography>
                <PrimaryButton
                  type="submit"
                  variant="contained"
                  size="medium"
                >
                  Login
                </PrimaryButton>
              </Stack>
            </FormControl>
          </Stack>
        </FormBox>
      </ContentContainer>
    </Stack>
  );
};
