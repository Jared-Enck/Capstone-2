import './Forms.css';
import React, {useContext, useState} from 'react';
import useFields from '../hooks/useFields';
import UserContext from '../context/UserContext';
import Alert from '../common/Alert';

export default function SignUpForm() {
  const initialState = {
    username: '', 
    password: '', 
    email: ''
  };

  const [formData,handleChange] = useFields(initialState);
  const [formErrors, setFormErrors] = useState([]);
  const {registerUser} = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(formData);
    if (!result.success) {
      setFormErrors(result.err);
    };
  };

  return (
    <div className='container-sm'>
      {
        formErrors.length
        ? (
          <div className='row'>
            <Alert 
              type='danger' 
              messages={formErrors} 
              setFormErrors={setFormErrors} 
            />
          </div>
        )
        :null
      }
      <div className="row Forms-row mx-auto">
        <div className='col-12 col-sm-8 col-md-5'>
          <h2>
            Sign Up
          </h2>
          <form 
            className="p-3 Forms shadow"
            onSubmit={handleSubmit}
          >
            <div className='row'>
              <div className='form-group'>
                <label htmlFor='username'>
                  Username
                </label>
                <input 
                  className='form-control'
                  name="username"
                  type='text'
                  value={formData.username || ''}
                  onChange={handleChange}
                  autoFocus
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>
                  Password
                </label>
                <input 
                  className='form-control'
                  name="password"
                  type='password'
                  value={formData.password || ''}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>
                  Email
                </label>
                <input 
                  className='form-control'
                  name="email"
                  type='email'
                  value={formData.email || ''}
                  onChange={handleChange}
                />
              </div>
              <button className="col-7 btn btn-primary mt-3">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};