import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_USER } from '../utils/queries';
import { UPDATE_USER, DELETE_USER } from '../utils/mutations';

function Profile(props) {

  const [updateUser, { error }] = useMutation(UPDATE_USER);
  const [deleteUser, { error2 }] = useMutation(DELETE_USER);

  let user = {}
  const { data } = useQuery(QUERY_USER);
  if (data) {
    user = data.user;
  }

  const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const handleUpdate = async (event) => {
    event.preventDefault();
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

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const deleteResponse = await deleteUser({
        variables: {
          password: formState.password,
        },
      });
      if (deleteResponse) {
        Auth.logout();
      }
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
  };


  return (
    <div className="row justify-content-center">
      <div className="card text-center" className="form-group col-md-6 col-lg-4">
        <h2 class="text-center">User Profile</h2>
        <form>
          <div className="row mx-3">
            <label htmlFor="firstName">First Name:</label>
            <input className="form-control"
              defaultValue={user.firstName}
              name="firstName"
              type="firstName"
              id="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="row mx-3">
            <label htmlFor="lastName">Last Name:</label>
            <input className="form-control"
              defaultValue={user.lastName}
              name="lastName"
              type="lastName"
              id="lastName"
              onChange={handleChange}
            />
          </div>

          <div className="row mx-3">
            <label htmlFor="email">Email Address:</label>
            <input className="form-control"
              defaultValue={user.email}
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="row mx-3">
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
          {error2 ? (
            <div>
              <p className="error-text text-center">{error2.message}</p>
            </div>
          ) : null}
          <div className="row my-2 mx-3 justify-content-center">
            <button className="btn btn-primary mt-1" type="submit" onClick={handleUpdate}>Update Profile</button>
            <button className="btn btn-primary ml-2 mt-1" type="submit" onClick={handleDelete} >Delete Profile</button>
          </div>
        </form>
      </div>
    </div>

  );

}

export default Profile;
