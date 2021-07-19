import React from "react";
import Jumbotron from "../components/Jumbotron";
import Auth from '../utils/auth';

function UserDeleted() {

  setTimeout(() => {
    window.location.assign('/');
    Auth.logout();
  }, 5000);




  return (
    <div>
      <Jumbotron>
        <h1>User has been deleted!</h1>
        <h2>
          We are sorry to see you go. If you want to shop again with us, you are welcome to signup again.
        </h2>
        <h2>
          You will now be redirected to the home page
        </h2>
      </Jumbotron>
    </div>
  );
};

export default UserDeleted;
