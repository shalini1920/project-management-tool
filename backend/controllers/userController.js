const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


let users = [];

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secretkey", {
    expiresIn: "7d",
  });
};


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = users.find((u) => u.email === email);
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), name, email, password: hashed };
  users.push(user);

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  });
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  });
};


const getProfile = (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  res.json({ id: user.id, name: user.name, email: user.email });
};

module.exports = { registerUser, loginUser, getProfile };