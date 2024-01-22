// linkedin.js
import React from 'react';
import { LinkedInApi } from '../config';
import linkedInLoginImage from '../images/linkedin-login-images/Retina/Sign-In-Small---Default.png';

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
    if (window.opener && window.opener !== window) {
      const code = this.getCodeFromWindowURL(window.location.href);
      window.opener.postMessage({ type: 'code', code: code }, '*');
      window.close(); // Close the popup after receiving the code
    }
    window.addEventListener('message', this.handlePostMessage);
  };


  handlePostMessage = async (event) => {
    try {
      if (event.data.type === 'code') {
        const { code } = event.data;
        const userCredentials = await this.getUserCredentials(code);
        if (userCredentials.success) {
        // Access user information from the response
        const { firstName, lastName, email } = userCredentials.data.user;

        // Display user information as needed
        console.log(`Welcome, ${firstName} ${lastName}! Email: ${email}`);

        // Optionally, update the state to reflect logged-in status
        this.setState({
          user: {
            firstName,
            lastName,
            email,
          },
          loggedIn: true,
        });
      } else {
        console.error('Error fetching user credentials:', userCredentials.error);
      }
    }
    } catch (error) {
      console.error('Error fetching user credentials:', error);
    } finally {
      // Close the popup window
      window.close();
    }
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
        // Access user information from the response
        const { firstName, lastName, email } = data.data. user;
  
        // Display user information as needed
        console.log(`Welcome, ${firstName} ${lastName}! Email: ${email}`);
  
        // Optionally, update the state to reflect logged-in status
        this.setState({
          user: {
            firstName,
            lastName,
            email,
          },
          loggedIn: true,
        });
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
        <img src={user.profileImageURL} alt="Profile image" />
        <h3>{`${user.firstName} ${user.lastName}`}</h3>
        <h3>{user.email}</h3>
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
