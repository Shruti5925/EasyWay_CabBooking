import  jwt from 'jsonwebtoken';
import User from '../models/User.js';

const userAuth = async (req, res, next) => {
  try {
    // console.log(req.headers)
    const {token}= req.headers;
    // console.log(token);
    // const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decoded)

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    // console.log(user);

    req.user = user._id; // add user to request object
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default userAuth
