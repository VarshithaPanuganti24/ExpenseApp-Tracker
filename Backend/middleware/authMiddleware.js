import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token is valid:", decoded);
      
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.error("Token verification error:", err); // ✅ use err here
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};







// export const protect = async (req, res, next) => {
//   let token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Not authorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Token invalid" });
//   }
// };


// {
//     "email":"sam@gmail.com",
//     "password":"sam12345"
// }

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTdmZjM5NWE3MWYxM2YxNzJkNDJhNyIsImVtYWlsIjoic2FtQGdtYWlsLmNvbSIsInRpbWUiOjE3NjEwNzkwMTYzMTgsImlhdCI6MTc2MTA3OTAxNiwiZXhwIjoxNzYxNjgzODE2fQ.fwHeic2YF3BlChqf5QoZvWZB_BJPjTXVZ0jBOqWf58s"