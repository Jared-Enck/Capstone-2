import { useState } from "react";
import {setFormErrors} from "../components/account/LoginForm"
/**Controls form fields */

export default function useFields(initialState) {  
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
    
    if (formErrors.length) {
      setFormErrors([]);
    }
  };

  return [
    formData, 
    handleChange,
    formErrors,
    setFormErrors
  ];
};