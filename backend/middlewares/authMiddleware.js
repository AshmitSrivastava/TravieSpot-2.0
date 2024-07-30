// const jwt = require('jsonwebtoken');
// require('dotenv').config({ path: "../../frontend/.env" });

// const authenticate = (req, res, next) => {
//     console.log("authMIddleware req.cookies : ", req.cookies);
//   const token = req.cookies.token;
//   console.log("Authenticate Middleware token : ", token);
//   if (!token) {
//     console.log("No token provided");
//     //req.user = null;
//     // return next();
//      return res.status(401).json({ message: 'No token provided' });
//   }
//   try {
//     console.log(process.env.JWT_SECRET);
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// };

// module.exports = authenticate;

const jwt = require('jsonwebtoken');
require('dotenv').config({ path: "../../frontend/.env" });

const authenticate = (req, res, next) => {
  console.log("authMiddleware req.cookies: ", req.cookies);
  const token = req.cookies.token;
  console.log("Authenticate Middleware token: ", token);
  
  if (!token) {
    console.log("No token provided");
    req.user = null;
    return next(); // Allow unauthenticated requests
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticate;

