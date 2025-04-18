const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.find({userRole:'admin'});
    if (!user)
      return res.status(401).json({ error: "User or Admin not found !" });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};


exports.index = async (req,res)=>{
  const { content, mediaFile, contentType, userId } = req.body;
  res.send(content);
}
