import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '', showPassError: false, showEmailError: false });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (formState.password.length < 6) {
      setFormState({
        ...formState,
        showPassError: true,
      })
    } else if ((formState.email.length <= 0) || (reg.test(formState.email) === false)) {
      setFormState({
        ...formState,
        showEmailError: true,
      });
    } else {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // console.log('State!!!', formState)
  return (
    <div className="row justify-content-center">
      <div className="card text-center form-group col-md-6 col-lg-4">
        <h2 className="text-center">Signup </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="row mx-3">
            <label htmlFor="firstName">First Name:</label>
            <input className="form-control"
              placeholder="First"
              name="firstName"
              type="firstName"
              id="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="row mx-3">
            <label htmlFor="lastName">Last Name:</label>
            <input className="form-control"
              placeholder="Last"
              name="lastName"
              type="lastName"
              id="lastName"
              onChange={handleChange}
            />
          </div>
          <div className="row mx-3">
            <label htmlFor="email">Email Address:</label>
            <input className="form-control"
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
            <div className="text-danger" style={{ display: formState.showEmailError ? 'block' : 'none' }}>Make email correct format!</div>
          </div>
          <div className="row mx-3">
            <label htmlFor="pwd">Password:</label>
            <input className="form-control"
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
            <div className="text-danger" style={{ display: formState.showPassError ? 'block' : 'none' }}>Make password at least 6 characters!</div>
          </div>
          <div className="row my-2 mx-3 justify-content-center">
            <button className="btn btn-primary mt-1" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default Signup;
