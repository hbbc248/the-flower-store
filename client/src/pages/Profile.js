import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_USER } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';

function Profile(props) {

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  let user = {}
  const { data } = useQuery(QUERY_USER);
  if (data) {
    user = data.user;
  }
  
    const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(event);
      try {
        let newFirstName = '';
        let newLastName = '';
        let newEmail = '';
        if (!formState.firstName) {
          newFirstName = user.firstName;
        } else {
          newFirstName = formState.firstName;
        }
        if (!formState.lastName) {
          newLastName = user.lastName;
        } else {
          newLastName = formState.lastName;
        }
        if (!formState.email) {
          newEmail = user.email;
        } else {
          newEmail = formState.email;
        }
        const mutationResponse = await updateUser({
          variables: {
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            password: formState.password,
          },
        });
        const token = mutationResponse.data.updateUser.token;
        Auth.login(token);
      } catch (e) {
        console.log(e)
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
      console.log(formState)
    };
  

  return (
    <div className="card text-center" className="form-group col-lg-4 offset-md-4">
      <h2 class="text-center">User Profile</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="col">
          <label htmlFor="firstName">First Name:</label>
          <input className="form-control"
            defaultValue={user.firstName}
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <label htmlFor="lastName">Last Name:</label>
          <input className="form-control"
            defaultValue={user.lastName}
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <label htmlFor="email">Email Address:</label>
          <input className="form-control"
            defaultValue={user.email}
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <label htmlFor="pwd">Enter your password to update or delete profile:</label>
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
            <p className="error-text text-center">{error.message}</p>
          </div>
        ) : null}
        <div className="col-auto my-1">
          <button className="btn btn-primary" type="submit">Update Profile</button>
        </div>
      </form>
    </div>

  );

}

export default Profile;
