const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.query.token || req.headers.authorization || req.body.token;
    // console.log(`THE TOKEN IS: ${token}`);

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      // console.log('WE HAVE A TOKEN');
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      console.log('NO TOKEN FOUND');
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // send to next endpoint
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
