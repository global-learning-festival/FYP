import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();

export const LinkedinAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const LinkedInApi = {
    oauthUrl: 'http://localhost:5000/api/linkedin/authorize', // Replace with your LinkedIn OAuth URL
    redirectUrl: 'http://localhost:5000/api/linkedin/redirect', // Replace with your LinkedIn callback URL
  };

  const storeUserData = (userData, callback) => {
    // Implement your logic to store user data, e.g., make an API request
    console.log('Storing user data:', userData);
    // Invoke the callback if provided
    if (callback) {
      callback();
    }
  };

  const linkedinSignIn = (onLinkedInUserCallback) => {
    // You may need to configure the LinkedInAuthProvider with your LinkedIn API credentials
    // const provider = new LinkedInAuthProvider();
  
    // Perform LinkedIn authentication logic, e.g., open a popup
    // You can customize this part based on your specific authentication flow
    const width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;
  
    const FulloauthUrl = LinkedInApi.oauthUrl;
    console.log('Opening LinkedIn popup:', FulloauthUrl);
    
  
    // Open LinkedIn popup
    const linkedinPopup = window.open(
      FulloauthUrl,
      'Linkedin',
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`
      
    );
  
    // Set up an event listener to handle messages from the LinkedIn popup
    const handleMessage = (event) => {
      try {
        console.log('Received post message:', event.data);
        if (event.data.type === 'userCredentials') {
          const { userCredentials } = event.data;
          // Access user information from the response
          const { name, company, uid } = userCredentials.data.user;
  
          // Update the user state in your context
          setUser((prevUser) => ({
            ...prevUser,
            name,
            company,
            uid,
          }));
  
          // Close the LinkedIn popup
          if (linkedinPopup) {
            linkedinPopup.close();
          }
  
          // Store user data in the backend and invoke the callback
          storeUserData(
            {
              name,
              company,
              uid,
            },
            () => {
              if (onLinkedInUserCallback) {
                onLinkedInUserCallback({
                  name,
                  company,
                  uid,
                });
              }
            }
          );
          
        }
      } catch (error) {
        console.error('Error processing user credentials:', error);
      }
    };
  
    // Attach the event listener to handle messages from the popup
    window.addEventListener('message', handleMessage);
  };

  const logout = () => {
    // Implement logout logic if necessary
    setUser({});
    localStorage.removeItem("loggedInUserID");
    window.location.reload();
  };

  // You might need to fetch user information from your server on component mount

  useEffect(() => {
    // Fetch user information from your server and update the user state
    const handleMessage = (event) => {
        try {
          console.log('Received post message:', event.data);
          if (event.data.type === 'userCredentials') {
            const { userCredentials } = event.data;
            const { name, company, uid } = userCredentials.data.user;
  
            // Update the user state in your context
            setUser({
              name,
              company,
              uid,
            });
          }
        } catch (error) {
          console.error('Error processing user credentials:', error);
        }
      };

      // Attach the event listener to handle messages from the popup
    window.addEventListener('message', handleMessage);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };

  }, []);

  return (
    <AuthContext.Provider value={{ linkedinSignIn, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useLinkedinAuth = () => {
  return useContext(AuthContext);
};
