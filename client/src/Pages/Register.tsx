import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginImg from "../assets/login.png";
import { Navbar } from './Navbar';

export const Register: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };

    const signupbtn = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/user/register', {name,email,password});
            localStorage.setItem("token", response.data.token);
            navigate("/addProducts");
        } catch (error) {
            alert("Error occurred while creating your account, sorry! You may have to restart your server.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                {/* Inner container with flex for form and image */}
                <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    
                    {/* Left Side (Image) */}
                    <div className="hidden md:flex w-1/2">
                        <img src={loginImg} alt="Office View" className="object-cover w-full h-full" />
                    </div>

                    {/* Right Side (Form) */}
                    <div className="flex flex-col justify-center w-full md:w-1/2 p-8">
                        {/* Header and description */}
                        <div className="text-left">
                            <h2 className="text-3xl font-semibold text-white mb-2">Sign up to begin journey</h2>
                            <p className="text-sm text-gray-400 mb-6">This is a basic signup page used for levitation assignment purposes.</p>
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={signupbtn} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400">Enter your name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-100 focus:border-green-500 focus:ring-green-500 focus:outline-none" 
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={handleNameChange}
                                    required
                                    minLength={3}
                                    maxLength={20}
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-100 focus:border-green-500 focus:ring-green-500 focus:outline-none" 
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-100 focus:border-green-500 focus:ring-green-500 focus:outline-none" 
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                    minLength={5}
                                    
                                />
                            </div>

                            {/* Register Button */}
                            <div className="flex items-center justify-between">
                                <button 
                                    type="submit" 
                                    className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
                                >
                                    Register
                                </button>
                            </div>

                            {/* Login Link */}
                            <div className="flex justify-end mt-2">
                                <Link to='/login' className='text-sm text-blue-500 hover:text-blue-600'>
                                    Already have an account? Login here
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
