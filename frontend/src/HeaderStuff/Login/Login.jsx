import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import app from './FirebaseConfig';


const Login = () => {
    
  const initialData = { email: '', pwd: '' };
  const [dataValue, setDataValue] = useState(initialData);

  const auth = getAuth(app);

  const handleChange = (e) => {
    setDataValue({ ...dataValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, dataValue.email, dataValue.pwd)
      .then((userCredential) => {
        const user = userCredential.user;
        alert('SignIn Success');
        console.log(`Welcome, ${user.email}`);

        if (!dataValue.email || !dataValue.pwd) {
          alert('All fields are mandatory');
          return;
        }

        console.log('Submitted:', dataValue);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      });
  };

  const googleLogin = ()=>{

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        alert("Successfully Signed In with Google")
      
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://i.pinimg.com/originals/eb/19/a4/eb19a4aaa1ef7bff73e0331f3dff1376.jpg')", padding: '20px' }}>
        <div className="bg-white bg-opacity-30 border rounded-lg p-8 shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="username" className="text-lg font-semibold">Username</label>
              <input type="email" name="email" value={dataValue.email} onChange={handleChange} className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:text-black text-black" />
            </div>
            <div>
              <label htmlFor="password" className="text-lg font-semibold">Password</label>
              <input type="password" name="pwd" value={dataValue.pwd} onChange={handleChange} className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500  focus:text-black text-black" />
            </div>
            <div className='flex flex-col items-center justify-center'>
              <button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full py-3 rounded-full hover:opacity-90 transition-all duration-300">
                Login
              </button>
              <h2 className='text-2xl font-bold p-2 '>OR</h2>
              <button type="button" onClick={googleLogin} className="bg-gradient-to-r from-white to-slate-200 text-black w-full py-2 rounded-full hover:opacity-90 transition-all duration-300 flex items-center justify-center">
                <FcGoogle className='text-4xl mr-2' /> Login with Google
              </button>
            </div>
            <NavLink to='/signup'>Not a user? SignUp</NavLink>
          </div>
        </div>
      </div>
    </form>
    </>
  );
};

export default Login;