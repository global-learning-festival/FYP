// linkedin.js
import React from 'react';
import { LinkedInApi } from '../config';
import linkedInLoginImage from '../images/linkedin-login-images/Retina/Sign-In-Small---Default.png';
import { useAuth } from '../context/LinkedinAuthContext';

export default class LinkedIn extends React.Component {
  initialState = {
    user: {},
    loggedIn: false,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  componentDidMount = () => {
    console.log('Component did mount');

    if (window.opener && window.opener !== window) {
       const code = this.getCodeFromWindowURL(window.location.href);
       console.log('Authorization code:', code);
       this.getUserCredentials(code);
    }
    window.addEventListener('message', this.handlePostMessage);
 };
 

  handlePostMessage = (event) => {
    try {
      console.log('Received post message:', event.data);
      if (event.data.type === 'userCredentials') {
        const { userCredentials } = event.data;
        // Access user information from the response
        const { name, company, uid } = userCredentials.data.user;

        // Optionally, update the state to reflect logged-in status
        this.setState({
          user: {
            name,
            company,
            uid,
          },
          loggedIn: true,
        });

        // Close the LinkedIn popup
        this.closePopup();

        // Store user data in the backend and invoke the callback
        this.storeUserData(
          {
            name,
            company,
            uid,
          },
          () => {
            // Invoke the callback passed as a prop
            if (this.props.onLinkedInUser) {
              this.props.onLinkedInUser({
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

  closePopup = () => {
    // Call a function in the parent window to close the popup
    if (window.opener) {
      window.opener.closePopup();
    }
    // Add this function in the parent window
    console.log('Closing popup window...');
    window.close();
  };

  getCodeFromWindowURL = (url) => {
    const popupWindowURL = new URL(url);
    return popupWindowURL.searchParams.get('code');
  };

  getUserCredentials = async (code) => {
    try {
      const response = await fetch(`${LinkedInApi.redirectUrl}?code=${code}`);
      const data = await response.json();
 
      if (data.success) {
        // Post user credentials to the parent window
        window.opener.postMessage({ type: 'userCredentials', userCredentials: data }, '*');
      } else {
        console.error('Error fetching user credentials:', data.error);
      }
    } catch (error) {
      console.error('Error fetching user credentials:', error);
    }
 };

  render() {
    const { loggedIn, user } = this.state;

    const contentWhenLoggedIn = (
      <div>
        {/* Display user information */}
        <h3>{`Welcome, ${user.name}! Email: ${user.email}`}</h3>
      </div>
    );

    const contentWhenLoggedOut = (
      <img
        src={linkedInLoginImage}
        alt="Sign in with LinkedIn"
        onClick={() => {
          this.showPopup();
        }}
      />
    );

    return <div>{loggedIn ? contentWhenLoggedIn : contentWhenLoggedOut}</div>;
  }

  showPopup = () => {
    const FulloauthUrl = LinkedInApi.oauthUrl;
    console.log('Opening LinkedIn popup:', FulloauthUrl);
    const width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;
    window.open(
      FulloauthUrl,
      'Linkedin',
      'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' +
        width +
        ', height=' +
        height +
        ', top=' +
        top +
        ', left=' +
        left
    );
  };
  
}
