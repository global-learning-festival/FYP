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
    <h1 className='text-center'>Google OAuth Sign In</h1>
        <div className='max-w-[240px] m-auto py-4'>
            <GoogleButton onClick={handleGoogleSignIn} />
        </div>
    </>
  )
}

export default SignIn;