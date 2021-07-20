import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="card text-center form-group col-md-6 col-lg-4">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="row mx-3">
            <label htmlFor="email">Email address:</label>
            <input className="form-control"
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
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
          </div>
          {error ? (
            <div>
              <p className="text-center text-danger">{error.message}</p>
            </div>
          ) : null}
          <div className="row my-2 mx-3 justify-content-center">
            <button className="btn btn-primary mt-1" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
