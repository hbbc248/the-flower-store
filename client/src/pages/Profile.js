import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_USER } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';
import DeleteUserBtn from '../components/DeleteUserBtn';

function Profile(props) {

  const [updateUser, { error }] = useMutation(UPDATE_USER);


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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="form-group col-md-6 col-lg-4">
        <h2 className="text-center">User Profile</h2>
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
          <div>
            {error ? (
              <div>
                <p className="text-danger text-center">{error.message}</p>
              </div>
            ) : null}
            <div className="row my-2 mx-3 justify-content-center">
              <button className="btn btn-primary mt-1" id="update" type="submit" onClick={handleUpdate}>Update Profile</button>
            </div>
          </div>
          <DeleteUserBtn password={formState.password} />
        </form>
      </div>
    </div>
  );
}

export default Profile;
