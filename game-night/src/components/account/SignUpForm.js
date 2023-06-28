import React, { useState, useContext } from "react";
import UserContext from '../../context/UserContext';
import {
  FormControl,
  Stack,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormBox,
  PrimaryButton,
  ErrorSpan,
  FormOutlinedInput,
  FormInputLabel
} from "./LoginForm";
import ContentContainer from "../common/ContentContainer";
import useFields from "../../hooks/useFields";

const genError = (err, idx) => {
  return (
    <ErrorSpan key={idx}>
      {err}
    </ErrorSpan>
  )
}

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const initialState = {
    username: '',
    password: '',
    email: '',
  };
  const [
    formData,
    handleChange,
    formErrors,
    setFormErrors
  ] = useFields(initialState);
  const { registerUser } = useContext(UserContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(formData);
    if (!result.success) {
      setFormErrors(result.err);
    };
  };

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
              <FormInputLabel
                htmlFor="email"
              >
                Email
              </FormInputLabel>
              <FormOutlinedInput
                type="text"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              {
                formErrors
                  ? formErrors.map((e, idx) => genError(e, idx))
                  : null
              }

              <PrimaryButton
                type="submit"
                size="medium"
              >
                Sign Up
              </PrimaryButton>
            </FormControl>
          </Stack>
        </FormBox>
      </ContentContainer>
    </Stack>
  );
};
