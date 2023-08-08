import React from 'react';
import FormComponent from '../common/FormComponent';

export default function SignUpForm({ registerUser }) {
  const initialState = {
    username: '',
    password: '',
    email: '',
  };

  return (
    <FormComponent
      header={'Sign Up'}
      initialState={initialState}
      inputs={['username', 'password', 'email']}
      submitFunc={registerUser}
    />
  );
}
