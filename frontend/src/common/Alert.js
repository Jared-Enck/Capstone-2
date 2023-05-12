import React, {useEffect} from 'react';
import './Alert.css';

export default function Alert({ type = "danger", messages = [], setFormErrors }) {
  console.debug("Alert", "type=", type, "messages=", messages);

  const removeAlert = () => {
    const parent = document.getElementById('alert');
    parent.remove();
    setFormErrors([]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timer);
  },[]);

  return (
    <div className="row alert-container">
      <div
        id="alert"
        className={`col-12 col-sm-10 col-md-8 fs-5
          alert alert-${type} alert-dismissible fade show`} 
        role="alert"
      >
        {messages.map(error => (
          <p className="mb-0 small" key={error}>
            {error}
          </p>
        ))}
        <button 
          type="button" 
          className="btn-close" 
          data-bs-dismiss="alert" 
          aria-label="Close"
          onClick={removeAlert}
        ></button>
      </div>      
    </div>
  );
};