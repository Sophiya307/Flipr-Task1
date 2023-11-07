import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../FormStyle.css';

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    agree: false,
    country: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should contain only alphabets and spaces';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.agree) {
      newErrors.agree = 'You must agree to the terms';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (name === 'email') {
      // Real-time email validation
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        setErrors({
          ...errors,
          email: 'Email is not valid',
        });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }

    if (name === 'name') {
      // Real-time name validation
      if (!/^[A-Za-z][A-Za-z\s]*$/.test(value)) {
        setErrors({
          ...errors,
          name: 'Name should start with an alphabet and contain only alphabets and spaces',
        });
      } else {
        setErrors({ ...errors, name: '' });
      }
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const isSubmitDisabled = () => {
    return (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.gender ||
      !formData.agree ||
      !formData.country ||
      Object.keys(errors).some((key) => !!errors[key])
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid, you can submit or handle the data
      alert('Form submitted successfully!');
      console.log('Form Submitted');
    }
  };

  return (
    <div class='form_bg'>
    <h2 className='my-5'>Enter Your Details Here</h2>
    <div class='container'>
      <form onSubmit={handleSubmit}>
        <div class='form-group'>
          <label>Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            class={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <div class='invalid-feedback'>{errors.name}</div>}
        </div>

        <div class='form-group'>
          <label>Email</label>
          <input
            type='text'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            class={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <div class='invalid-feedback'>{errors.email}</div>}
        </div>

        <div class='form-group'>
          <label>Gender</label>
          <div class='form-check d-flex align-items-center'>
            <input
              type='radio'
              name='gender'
              value='male'
              checked={formData.gender === 'male'}
              onChange={handleInputChange}
              class={`form-check-input ${errors.gender ? 'is-invalid' : ''}`}
            />
            <label class='form-check-label ms-3'>Male</label>
          </div>
          <div class='form-check d-flex align-items-center'>
            <input
              type='radio'
              name='gender'
              value='female'
              checked={formData.gender === 'female'}
              onChange={handleInputChange}
              class={`form-check-input ${errors.gender ? 'is-invalid' : ''}`}
            />
            <label class='form-check-label ms-3'>Female</label>
          </div>
          {errors.gender && (
            <div class='invalid-feedback'>{errors.gender}</div>
          )}
        </div>

        <div class='form-group'>
          <label>Agree to Terms</label>
          <div class='form-check d-flex align-items-center'>
            <input
              type='checkbox'
              name='agree'
              checked={formData.agree}
              onChange={handleInputChange}
              class={`form-check-input ${errors.agree ? 'is-invalid' : ''}`}
            />
            <label class='form-check-label ms-3'>I agree</label>
          </div>
          {errors.agree && <div class='invalid-feedback'>{errors.agree}</div>}
        </div>

        <div class='form-group'>
          <label>Country</label>
          <select
            name='country'
            value={formData.country}
            onChange={handleInputChange}
            class={`form-control ${errors.country ? 'is-invalid' : ''}`}
          >
            <option value=''>Select Country</option>
            <option value='in'>India</option>
            <option value='us'>United States</option>
            <option value='ca'>Canada</option>
            <option value='uk'>United Kingdom</option>
          </select>
          {errors.country && (
            <div class='invalid-feedback'>{errors.country}</div>
          )}
        </div>

        <button
          type='submit'
          class='btn btn-primary mt-5'
          disabled={isSubmitDisabled()}
        >
          Submit
        </button>
      </form>
    </div>
  </div>
  );
};

export default FormPage;