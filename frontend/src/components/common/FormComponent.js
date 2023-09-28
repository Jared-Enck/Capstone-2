import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { FormControl, Stack, Typography, Box } from '@mui/material';
import { FormBox, FormTextField, ErrorSpan } from '../styled';
import ContentContainer from './ContentContainer';
import PasswordAdornment from './PasswordAdornment';
import { PrimaryButton } from '../styled';
import useFields from '../../hooks/useFields';
import CircularLoading from './CircularLoading';

export default function FormComponent({
  header,
  initialState,
  inputs,
  submitFunc,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { navigate } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const isLogin = header === 'Login';

  const inputType = showPassword ? 'text' : 'password';

  const [formData, handleChange, formErrors, setFormErrors] =
    useFields(initialState);

  // handle showPassword toggle
  const handleShowPassword = () => setShowPassword((show) => !show);

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // POST request in submitFunc with formData
    const result = await submitFunc(formData);
    if (result) {
      // if errors in POST request
      setFormErrors(result.err);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      navigate('/');
    }
  };

  return (
    <Stack sx={{ paddingTop: 10 }}>
      <ContentContainer alphascale={0.4}>
        <FormBox
          component='form'
          onSubmit={handleSubmit}
        >
          <Typography
            variant='h5'
            sx={{ color: 'primary.text' }}
          >
            {header}
          </Typography>

          <Box sx={{ height: 24, width: 400, marginBottom: '.4rem' }}>
            {typeof formErrors[0] === 'string' ? (
              <ErrorSpan>{formErrors[0]}</ErrorSpan>
            ) : null}
          </Box>

          <Stack spacing={3}>
            {inputs.map((name, idx) => {
              const firstLetter = name[0].toUpperCase();
              const label = firstLetter.concat(name.slice(1));
              const isPassword = name === 'password';

              return (
                <FormControl key={name}>
                  <FormTextField
                    variant='outlined'
                    label={label}
                    type={isPassword ? inputType : 'text'}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    autoFocus={idx === 0}
                    autoComplete={isPassword ? 'current-password' : ''}
                    InputProps={{
                      endAdornment: isPassword ? (
                        <PasswordAdornment
                          showPassword={showPassword}
                          handleShowPassword={handleShowPassword}
                        />
                      ) : null,
                    }}
                    helperText={
                      formErrors.length && !isLogin ? (
                        <ErrorSpan>{formErrors[0][name]}</ErrorSpan>
                      ) : null
                    }
                    required
                  />
                </FormControl>
              );
            })}

            {isLogin ? (
              <Box sx={{ height: 56, display: 'flex' }}>
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: 'primary.text',
                    margin: 'auto',
                  }}
                >
                  Don't have an account yet? Sign up
                  <Link to={'/signup'}> here.</Link>
                </Typography>
              </Box>
            ) : null}

            <PrimaryButton
              variant='contained'
              type='submit'
              className='main-button'
            >
              Submit
              {isLoading ? (
                <Box
                  sx={{
                    position: 'absolute',
                    right: 20,
                  }}
                >
                  <CircularLoading
                    size='1.3rem'
                    color='primary.dark'
                  />
                </Box>
              ) : null}
            </PrimaryButton>
          </Stack>
        </FormBox>
      </ContentContainer>
    </Stack>
  );
}
