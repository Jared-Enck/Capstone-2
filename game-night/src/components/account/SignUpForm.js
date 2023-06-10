import React, { useState, useContext } from "react";
import UserContext from '../../context/UserContext';
import {
  InputLabel,
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
  FormBackGround
} from "./LoginForm";
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
  const {registerUser} = useContext(UserContext);

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
    <FormBackGround>
      <FormBox 
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Stack spacing={2}>
          <FormControl>
            <InputLabel 
              htmlFor="username"
            >
              Username
            </InputLabel>
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
            <InputLabel 
              htmlFor="password"
            >
              Password
            </InputLabel>
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
            <InputLabel 
              htmlFor="email"
            >
              Email
            </InputLabel>
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
                ? formErrors.map((e,idx) => genError(e,idx))
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
    </FormBackGround>
  );
};
