import React from 'react';
import GoogleButton from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignIn = () => {

    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
    
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user != null) {
            navigate("/")
        }
    },[user])

  return (
    <>
        <div class="flex items-center justify-center mt-20">
            <div class="flex flex-col items-center w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl">
                Sign In With Google
                </h5>
                <p class="flex flex-col items-center text-center text-sm font-normal text-gray-500 dark:text-gray-400">
                Have access to personalised features by signing in with Google!
                </p>
                <GoogleButton onClick={handleGoogleSignIn} />
            </div>
        </div>z
    </>
  )
}

export default SignIn;