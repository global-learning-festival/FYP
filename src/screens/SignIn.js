import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import LinkedIn from '../components/Linkedin'; // Import LinkedIn component directly
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import config2 from '../components/config2';

const SignIn = () => {
    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const localhostapi = "http://localhost:5000"; // Update with your backend API URL
    const serverlessapi = "https://fyp-9bxz.onrender.com";

    useEffect(() => {
        if (user !== null) {
            const { displayName, uid, userid } = user;
    
            if (displayName && typeof displayName === 'string') {
                const [first_name, last_name] = displayName.split(' ');
    
                setLoading(true);
                axios.get(`${localhostapi}/useruid/${uid}`)
                    .then(response => {
                        if (response.data) {
                            console.log('User already exists. Retrieving information:', response.data);
                            console.log(response.data.userid);
                            navigate(`/editprofile/${response.data.userid}`);
                        } else {
                            const userData = {
                                first_name,
                                last_name,
                                company: '',
                                uid,
                                userid,
                                type: config2.type
                            };
    
                            axios.post(`${localhostapi}/adduser`, userData)
                                .then(response => {
                                    console.log('User information stored successfully:', response.data);
                                })
                                .catch(error => {
                                    console.error('Error storing user information:', error);
                                });
                        }
                    })
                    .catch(error => {
                        console.error('Error checking user existence:', error);
                        navigate('/');
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                console.error('User display name is undefined or not a string');
                navigate('/signin');
            }
        }
    }, [user, navigate, localhostapi, serverlessapi]);
    
    return (
        <>
            <div className="flex items-center justify-center mt-20">
                <div className="flex flex-col items-center w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
                        Sign In With Google
                    </h5>
                    <p className="flex flex-col items-center text-center text-sm font-normal text-gray-500 dark:text-gray-400">
                        Have access to personalised features by signing in with Google!
                    </p>
                    <div className="flex items-center justify-center mt-3">
                    <GoogleButton onClick={googleSignIn} />
                    </div>
                    <p className="flex flex-col items-center text-center text-sm font-normal text-gray-500 dark:text-gray-400 mt-3">or</p>
                    <div className="flex items-center justify-center mt-3">
                        <LinkedIn></LinkedIn>
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default SignIn;
