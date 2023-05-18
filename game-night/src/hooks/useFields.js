import { useState } from "react";
import {setFormErrors} from "../components/LoginForm"
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
    
    if (formErrors) {
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