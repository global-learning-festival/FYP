/*
export const LinkedInApi = {
    clientId: '86bmj5hgj05pbm',
    redirectUrl: 'http://localhost:5000/auth/linkedin/authorize',
    oauthUrl: 'http://localhost:5000/api/linkedin/authorize',
    scope: 'r_liteprofile%20r_emailaddress',
    state: '123456'
};

export const NodeServer = {
    baseURL: 'http://localhost:5000',
    getUserCredentials: '/getUserCredentials'
};
*/


// config.js new updated
/*
export const LinkedInApi = {
    clientId: '86xaprshce5ge9', // Update with your CLIENT_ID
    redirectUrl: 'http://localhost:5000/api/linkedin/redirect', // Update with your REDIRECT_URL
    oauthUrl: 'http://localhost:5000/api/linkedin/authorize',
    scope: 'email profile', // Update with your desired scope
    state: '123456',
  };
  
  export const NodeServer = {
    baseURL: 'http://localhost:5000',
    getUserCredentials: '/api/linkedin/redirect',
  };
  */


  export const LinkedInApi = {
    CLIENT_ID: '86bmj5hgj05pbm', // Update with your CLIENT_ID
    CLIENT_SECRET: 'SLqhmywaNKgICBMw',
    redirectUrl: 'http://localhost:5000/api/linkedin/redirect', // Update with your REDIRECT_URL
    REDIRECT_URI: 'http://localhost:5000/api/linkedin/redirect', 
    oauthUrl: 'http://localhost:5000/api/linkedin/authorize',
    SCOPE: 'openid profile email', // Update with your desired scope
  };
  
  export const NodeServer = {
    baseURL: 'http://localhost:5000',
    getUserCredentials: 'http://localhost:5000/api/linkedin/redirect',
  };