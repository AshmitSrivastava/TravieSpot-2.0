import React from 'react';
import { useState } from "react";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { NavLink } from 'react-router-dom';
import app from './FirebaseConfig'
import Login from './Login';


const auth = getAuth(app)

const SignUp = () => {
    const Data = { fname: '', lname: '', email: '', pwd: '', cpwd: '' }
    const [InputData, setInputData] = useState(Data)
  

    const handleOnChange = (e) => {
        setInputData({ ...InputData, [e.target.name]: e.target.value })
    } /*setInputData is a function here, name is the id */


    const createUser = ()=>{
    createUserWithEmailAndPassword(auth, InputData.email, InputData.pwd).then((value=> alert("Success")));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!InputData.fname || !InputData.lname || !InputData.email || !InputData.pwd || !InputData.cpwd) {
            alert("All fields are mandatory")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="h-screen w-screen flex items-center justify-center bg-cover bg-center overflow-hidden bg-[url('https://i.pinimg.com/originals/eb/19/a4/eb19a4aaa1ef7bff73e0331f3dff1376.jpg')]">
                <div className="bg-white bg-opacity-30 border rounded-lg p-8 w-1/4 ">
                    <h2 className="text-3xl font-bold mb-8 text-center">Sign Up</h2>
                    <div>
                        <label htmlFor="firstName" className="text-lg font-semibold">First Name</label>
                        <input type="text" name='fname' value={InputData.fname} onChange={handleOnChange} className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="text-lg font-semibold">Last Name</label>
                        <input type="text" name='lname' value={InputData.lname} onChange={handleOnChange} className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-lg font-semibold">Email</label>
                        <input type="email" name='email' value={InputData.email} onChange={handleOnChange} className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-lg font-semibold">Password</label>
                        <input type="password" name='pwd' value={InputData.pwd} onChange={handleOnChange} className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="text-lg font-semibold">Confirm Password</label>
                        <input type="password" name='cpwd' value={InputData.cpwd} onChange={handleOnChange} className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" />
                    </div>
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full hover:opacity-90 transition-all duration-300 w-10/12 m-7 text-xl" onClick={createUser}>Sign Up</button>
                    <NavLink to='/login'>Already user? Login</NavLink>

                </div>
            </div>
        </form>
    );
}

export default SignUp;
