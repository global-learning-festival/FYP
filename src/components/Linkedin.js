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

  handlePostMessage = (event) => {
    if (event.data.type === 'code') {
      const { code } = event.data;
      this.getUserCredentials(code);
    }
  };

  getCodeFromWindowURL = (url) => {
    const popupWindowURL = new URL(url);
    return popupWindowURL.searchParams.get('code');
  };

  getUserCredentials = async (code) => {
    // Call your backend to exchange the code for user credentials
    // Update the state with user information on successful login
    try {
      const response = await fetch(`${LinkedInApi.redirectUrl}?code=${code}`);
      const user = await response.json();

      this.setState({
        user,
        loggedIn: true,
      });
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
