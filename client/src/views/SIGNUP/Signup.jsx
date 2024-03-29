// ___________________ importing modules
import React, {useState} from 'react';
import loginImg from "../../assets/images/signup/signup.svg";
import {Header, Loading, Particles, SignupForm} from "../../components/components";
import "./Signup.css";

const Signup = () => {
  const [signupLoading, setSignupLoading] = useState(false);
  return (
    <>
    {signupLoading ? <Loading loadType='screenLoad'/> : ''}
    <Header 
      headType="JoogleHeader" 
    />
    <Particles />
      <div className="signup-container">
            <div className="signup-items">
              <span id="signup-image-container">
                <img src={loginImg} alt="logo" id='signup-image'/>
              </span>
              <SignupForm loadingVisibility={setSignupLoading}/>
            </div>
        </div>
    </>
  )
};

export default Signup;