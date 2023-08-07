import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { FormControl, Stack, Typography } from '@mui/material';
import ContentContainer from '../common/ContentContainer';
import useFields from '../../hooks/useFields';
import { FormBox, PrimaryButton, ErrorSpan } from '../common/styled';
import FormInput from '../common/FormInput';

const genError = (err, idx) => {
  return <ErrorSpan key={idx}>{err}</ErrorSpan>;
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? 'text' : 'password';

  const initialState = {
    username: '',
    password: '',
  };
  const [formData, handleChange, formErrors, setFormErrors] =
    useFields(initialState);

  const { loginUser, navigate } = useContext(UserContext);

  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(formData);
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
              Login
            </Typography>
            {['username', 'password'].map((i, idx) => (
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
              <Stack spacing={2}>
                {formErrors.length
                  ? formErrors.map((e, idx) => genError(e, idx))
                  : null}
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: 'primary.text',
                  }}
                >
                  Don't have an account? Sign up{' '}
                  <Link to={'/signup'}>here.</Link>
                </Typography>
                <PrimaryButton
                  variant='contained'
                  type='submit'
                  className='main-button'
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
}
