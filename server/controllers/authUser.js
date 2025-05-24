import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.json({ success: false, msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      msg: "User registered",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({success:false,  msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({success:false, msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    // console.log(token);

    res.json({ success:true,  token, user });
  } catch (err) {
    res.status(500).json({success:true, msg: err.message });
  }
};


export const getUser = async (req, res) => {
  try {
    const id = req.user._id;

    const user = await User.findById(id).select("-password"); // await added

    if (!user) {
      return res.status(404).json({success:false, error: "User not found" });
    }

    // console.log("user", user);
    res.status(200).json({success:true, user:user});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};