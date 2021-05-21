import React from "react";
import { doSocialSignIn } from "../firebase/FirebaseFunctions";
import facebookImg from "../css/images/signin_facebook.jpeg";
import googleImg from "../css/images/signin_google.jpeg";

const SocialSignIn = () => {
  const socialSignOn = async (provider) => {
    try {
      await doSocialSignIn(provider);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <img
        onClick={() => socialSignOn("google")}
        alt="google signin"
        src={googleImg}
      />
      {/* <img
        onClick={() => socialSignOn("facebook")}
        alt="facebook signin"
        src={facebookImg}
      /> */}
    </div>
  );
};

export default SocialSignIn;
