import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
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
            const { displayName, uid,userid } = user;
            const [first_name, last_name] = displayName.split(' ');
    
            // Check if user already exists in the database
            setLoading(true);
            axios.get(`${localhostapi}/useruid/${uid}`)
                .then(response => {
                    if (response.data ) {
                        // User with the given UID exists, retrieve information
                        console.log('User already exists. Retrieving information:', response.data);
                        console.log(response.data.userid)
                        navigate(`/editprofile/${response.data.userid}`)
                       
                    } else {
                        // User does not exist, store user information in the database
                        const userData = {
                            first_name,
                            last_name,
                            company: '', // Assuming company is not available from Google sign-in
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
                    <GoogleButton onClick={googleSignIn} />
                </div>
            </div>
        </>
    );
};

export default SignIn;
