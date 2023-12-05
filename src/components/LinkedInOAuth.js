import React from 'react';
import{ LinkedInApi, NodeServer } from '../config';
import axios from 'axios';
import linkedInLoginImage from '../images/linkedin-login-images/Retina/Sign-In-Small---Default.png';

export default class App extends React.Component {
  initialState = {
    user: {},
    loggedIn: false
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  componentDidMount = () => {
    if (window.opener && window.opener !== window) {
      const code = this.getCodeFromWindowURL(window.location.href);
      window.opener.postMessage({'type': 'code', 'code': code}, '*')
      window.close();
    }
      window.addEventListener('message', this.handlePostMessage);
  };

  handlePostMessage = event => {
    if (event.data.type === 'code') {
      const { code } = event.data;
      this.getUserCredentials(code);
    }
  };

  getCodeFromWindowURL = url => {
    const popupWindowURL = new URL(url);
    return popupWindowURL.searchParams.get("code");
  };

  showPopup = () => {
    const { clientId, redirectUrl, oauthUrl, scope, state } = LinkedInApi;
    const fullOauthUrl = `${oauthUrl}&client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUrl}`;
    const width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;
    window.open(
      fullOauthUrl,
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

  getUserCredentials = code => {
    axios
      .get(`${NodeServer.baseURL} + ${NodeServer.getUserCredentials}?code=${code}`)
      .then(res => {
        const user = res.data;
        this.setState({
          user,
          loaded: true
        })
        // Do something with user
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
          <img src={linkedInLoginImage} alt="Sign in with LinkedIn"onClick={this.showPopup} />
        </>
    );
    return (
      <div>
        {loggedIn && user !== {} ? contentWhenLoggedIn : contentWhenLoggedOut}
      </div>
    )
  };
}


// import React from 'react';

// const LINKEDIN_CLIENT_SECRET = 'SLqhmywaNKgICBMw';
// const LINKEDIN_CLIENT_ID = '86bmj5hgj05pbm';
// const LINKEDIN_CALLBACK_URL = 'http://localhost:3000/auth/linkedin/callback';
// const linkedinOAuthURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(
//   LINKEDIN_CALLBACK_URL
// )}&scope=r_liteprofile%20r_emailaddress`;

// const LinkedInOAuth = () => {
//   const handleLogin = async (code) => {
//     // Exchange the code for an access token
//     const data = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
//       method: 'POST',
//       body: new URLSearchParams({
//         grant_type: 'authorization_code',
//         code,
//         redirect_uri: LINKEDIN_CALLBACK_URL,
//         client_id: LINKEDIN_CLIENT_ID,
//         client_secret: LINKEDIN_CLIENT_SECRET
//       })
//     }).then((response) => response.json());

//     const accessToken = data.access_token;

//     // Fetch the user's LinkedIn profile
//     const userProfile = await fetch(
//       'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName)',
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       }
//     );

//     // Handle the user profile data (e.g., store it in your database and log the user in)
//     console.log(
//       `Welcome, ${userProfile.data.firstName.localized.en_US} ${userProfile.data.lastName.localized.en_US}!`
//     );
//   };

//   const handleLinkedInCallback = () => {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const code = urlParams.get('code');
//     if (code) handleLogin(code);
//   };

//   React.useEffect(() => {
//     handleLinkedInCallback();
//   }, []);

//   return (
//     <div>
//       <a href={linkedinOAuthURL}>Sign in with LinkedIn</a>
//     </div>
//   );
// };

// export default LinkedInOAuth;