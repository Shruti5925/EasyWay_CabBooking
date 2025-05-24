import jwt from 'jsonwebtoken';
import Driver from '../models/Driver.js';

const driverAuth = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.status(401).json({ success: false, error: "Unauthorized: Token missing" });
    }

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

    // console.log(decoded);

    const driver = await Driver.findById(decoded.id).select("-password");

    if (!driver) {
      return res.status(404).json({ success: false, error: "Driver not found" });
    }

    req.driver = driver;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};

export default driverAuth;
