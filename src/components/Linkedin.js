// linkedin.js
import React from 'react';
import { LinkedInApi, NodeServer } from '../config';
import axios from 'axios';
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
      window.close();
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

  getUserCredentials = (code) => {
    axios
      .post(`${NodeServer.baseURL}/api/linkedin/redirect`, { code }) // Use POST method
      .then((res) => {
        const user = res.data.data; // Adjust according to your response structure
        this.setState({
          user,
          loggedIn: true,
        });
        // Do something with user
      })
      .catch((error) => {
        console.error('Error fetching user credentials:', error);
      });
  };

  render() {
    const { loggedIn, user } = this.state;
    const contentWhenLoggedIn = (
      <>
        <img src={user.profileImageURL} alt="Profile image" />
        <h3>{`${user.firstName} ${user.lastName}`}</h3>
        <h3>{user.email}</h3>
      </>
    );
    const contentWhenLoggedOut = (
      <>
        <h2>Sign in with LinkedIn</h2>
        <img
          src={linkedInLoginImage}
          alt="Sign in with LinkedIn"
          onClick={this.showPopup}
        />
      </>
    );
    return <div>{loggedIn && user !== {} ? contentWhenLoggedIn : contentWhenLoggedOut}</div>;
  }
}
