import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import useFields from '../hooks/useFields';
import './Forms.css';
import Alert from '../common/Alert';
// import FontAwesomeIcon from '../common/FontAwesomeIcon';

export default function LoginForm() {
  const initialState = {
    username: '', 
    password: ''
  };

  const [formData,handleChange] = useFields(initialState);
  const [formErrors, setFormErrors] = useState([]);
  const {loginUser} = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(formData);
    if (!result.success) {
      setFormErrors(result.err)
    };
  };

  return (
    <div className='container-sm'>
      {
        formErrors.length
        ? (
          <Alert 
            type='danger' 
            messages={formErrors} 
            setFormErrors={setFormErrors}
          />
        )
        :null
      }
      
      <div className="row Forms-row mx-auto">
        <div className='col-12 col-sm-8 col-lg-5'>
          <h2>
            Login
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
                <div className='input-group p-0'>
                  {/* <FontAwesomeIcon 
                    icon="fa-solid fa-user"
                    span="input-group-text"
                  /> */}
                  <input 
                    className='form-control'
                    name="username"
                    type='text'
                    value={formData.username || ''}
                    onChange={handleChange}
                    autoFocus
                  />
                </div>
              </div>
              <div className='form-group d-grid'>
                <label htmlFor='password'>
                  Password
                </label>
                <div className='input-group'>
                  {/* <FontAwesomeIcon
                    icon="fa-solid fa-lock"
                    span="input-group-text"
                  /> */}
                  <input 
                    className='form-control'
                    name="password"
                    type='password'
                    value={formData.password || ''}
                    onChange={handleChange}
                  />
                </div>
                <span className='text-center mt-2'>
                  Don't have an account? Sign up {' '}
                  <Link to='/signup' className='text-decoration-none' >
                      here!
                  </Link>
                </span>
                <button className="col-7 btn btn-primary mt-3 mx-auto">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );;
};