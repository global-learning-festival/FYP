import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import LinkedIn from "../components/Linkedin";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = ({ code }) => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const [setLoading] = useState(false);
  const localhostapi = "http://localhost:5000"; // Update with your backend API URL
  const serverlessapi = "https://adminilftest-4tmd.onrender.com";

  useEffect(() => {
    const handleUserExistence = async () => {
      if (user !== null) {
        const { displayName, uid, userid } = user;

        if (displayName && typeof displayName === "string") {
          const [first_name, last_name] = displayName.split(" ");

          setLoading(true);

          try {
            const response = await axios.get(`${serverlessapi}/useruid/${uid}`);
            if (response.data) {
              console.log("User already exists. Redirecting to home page.");
              navigate(`/`);
            } else {
              console.log(
                "User does not exist. Navigating to edit profile page."
              );
              const userData = {
                first_name,
                last_name,
                company: "",
                uid,
                userid,
                type: process.env.REACT_APP_TYPE,
              };
              console.log("userdata:", userData);
              await axios.post(`${serverlessapi}/adduser`, userData);
              navigate(`/editprofile/${uid}`);
            }
          } catch (error) {
            console.error("Error checking user existence:", error);
            navigate("/");
          } finally {
            setLoading(false);
          }
        } else {
          console.error("User display name is undefined or not a string");
          navigate("/signin");
        }
      }
    };

    handleUserExistence();
  }, [user, navigate, serverlessapi]);

  return (
    <>
      <div className="flex items-center justify-center mt-20">
        <div className="flex flex-col items-center w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6">
          <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
            Sign In With Google
          </h5>
          <p className="flex flex-col items-center text-center text-sm font-normal text-gray-500 dark:text-gray-400">
            Have access to personalised features by signing in with Google!
          </p>
          <div className="flex items-center justify-center mt-3">
            <GoogleButton onClick={googleSignIn} />
          </div>
          <p className="flex flex-col items-center text-center text-sm font-normal text-gray-500 dark:text-gray-400 mt-3">
            or
          </p>
          <div className="flex items-center justify-center mt-3">
            <LinkedIn />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
