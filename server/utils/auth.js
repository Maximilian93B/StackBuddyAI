require('dotenv').config();
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION;

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({req}) {
    console.log(req)
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;

    // Seperate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // Init an object to hold user data 
    const authData = {}

    if(token) {
      // Verify token 
      try{
        const {data} = jwt.verify(token, secret, { maxAge: expiration});
        authData.user = data;
      } catch (error) {
        console.log('Invlaid token');
        return res.status(400).json({ message: 'invalid token!' });
      }
    }
  
    // Return the authData , which should include the user if the token is valid
    return authData; 
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};