import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import app from "./HeaderStuff/Login/FirebaseConfig";
import "./Header.css";
import LogoR from "./assets/Images/LogoR.png";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [profileError, setProfileError] = useState(null); // State to handle profile picture errors

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserProfilePic(user.photoURL);
        setProfileError(null); // Clear any previous error
      } else {
        setIsLoggedIn(false);
        setUserProfilePic(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const handleSignOut = async () => {
    if (window.confirm("Do you want to sign out?")) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  };

  return (
    <div className="navBar">
      <div className="onav">
        <NavLink to="/">
          <img src={LogoR} className="logo" alt="Logo" />
        </NavLink>
        <ul className="nav-elements">
          <li>
            <NavLink to="/">Home </NavLink>
          </li>
          <li>
            <NavLink to="/about">About </NavLink>
          </li>
          <li>
            <NavLink to="/services">Services</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-button">
        <div className="choose-button">
          <button>Choose for me</button>
        </div>
        <div className="sign-button">
          {isLoggedIn ? (
            <>
              {profileError ? (
                <span className="profile-error">{profileError}</span>
              ) : (
                <img 
                  src={userProfilePic} 
                  alt="Profile Picture" 
                  className="profile-pic" 
                  onClick={handleSignOut}
                />
              )}
            </>
          ) : (
            <button onClick={handleLogin}>Sign In with Google</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
