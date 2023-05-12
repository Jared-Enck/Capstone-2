import { useState } from "react";

/**Controls form fields */

export default function useFields(initialState) {  
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const {name,value,checked,type} = e.target;
    const valueOrChecked = type === 'checkbox' ? checked : value;
    setFormData(fData => ({
      ...fData,
      [name]: valueOrChecked
    }));
  };

  return [formData, handleChange, setFormData];
};