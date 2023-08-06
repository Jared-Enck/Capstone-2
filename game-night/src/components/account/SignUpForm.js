import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { FormControl, Stack, Typography } from '@mui/material';
import { FormBox, PrimaryButton, ErrorSpan } from '../common/styled';
import ContentContainer from '../common/ContentContainer';
import FormInput from '../common/FormInput';
import useFields from '../../hooks/useFields';

const genError = (err, idx) => {
  return <ErrorSpan key={idx}>{err}</ErrorSpan>;
};

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? 'text' : 'password';

  const initialState = {
    username: '',
    password: '',
    email: '',
  };
  const [formData, handleChange, formErrors, setFormErrors] =
    useFields(initialState);
  const { registerUser, navigate } = useContext(UserContext);

  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(formData);
    if (result.msg === 'success') {
      navigate('/');
    } else {
      setFormErrors(result.msg);
    }
  };

  return (
    <Stack>
      <ContentContainer>
        <FormBox
          component='form'
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          <Stack spacing={2}>
            <Typography
              variant='h5'
              sx={{ color: 'primary.muted' }}
            >
              Sign Up
            </Typography>
            {['username', 'password', 'email'].map((i, idx) => (
              <FormInput
                key={i}
                name={i}
                formData={formData}
                handleChange={handleChange}
                idx={idx}
                inputType={inputType}
                showPassword={showPassword}
                handleShowPassword={handleShowPassword}
              />
            ))}
            <FormControl>
              {formErrors ? formErrors.map((e, idx) => genError(e, idx)) : null}
              <PrimaryButton
                variant='contained'
                type='submit'
                className='main-button'
              >
                Sign Up
              </PrimaryButton>
            </FormControl>
          </Stack>
        </FormBox>
      </ContentContainer>
    </Stack>
  );
}
