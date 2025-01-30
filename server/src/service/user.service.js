import User from "../../src/schema/user.models.js";  
import jwt from "jsonwebtoken";

let jwtToken = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      fullName,
      email,
      password,
      confirm_password: password,
      role,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      `${jwtToken}`,
      { expiresIn: "2h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
async function logout(req, res) {
  try {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "Strict" });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export { register, login  ,logout};
