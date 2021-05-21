import React, { useContext } from "react";
import SignOutButton from "./SignOut";
import "../App.css";
import "../css/account.css";
import ChangePassword from "./ChangePassword";
import AddProfilePicture from "./addProfilePicture";
import { AuthContext } from "../firebase/Auth";

function Account() {
  const { currentUser } = useContext(AuthContext);
  console.log("currentUser", currentUser.displayName);
  return (
    <div>
      <div className="heading-name">
        <h1>Account Page</h1>
      </div>
      {/* <h2>Account Page</h2> */}
      <AddProfilePicture username={currentUser.email} />
      <br></br>
      <ChangePassword />
    </div>
  );
}

export default Account;
