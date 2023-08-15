import { useState } from 'react';

/** Controls form fields
 *
 * resets formErrors on change, if any
 */

export default function useFields(initialState) {
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));

    if (formErrors.length) {
      setFormErrors([]);
    }
  };

  return [formData, handleChange, formErrors, setFormErrors, setFormData];
}
