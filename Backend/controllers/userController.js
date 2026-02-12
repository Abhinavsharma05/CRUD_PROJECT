const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

//@description Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async  (req,res) => {
  const {email,password} = req.body;
  if( !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory")
  }
  const userAvailable = await User.findOne({email});
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered")
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password", hashedPassword)
  const user = await User.create({
    email,
    password: hashedPassword
  })
  console.log(`user created ${user}`)
  if (user) {
    res.status(201).json({_id: user.id, email: user.email})
  }
  else{
    res.status(400);
    throw new Error("User data is not valid")
  }
  
})



//@description Login user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async  (req,res) => {
  const {email, password} = req.body;
  if(!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email })
  //compare password with hashedPassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({
      user: {
        email: user.email,
        id: user.id
      }
    }, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "20m"})
    res.status(200).json({accessToken})
  }
  else {
    res.status(401);
    throw new Error("email or password is not valid")
  }
  
})

//@description Current user information
//@route GET /api/users/current
//@access private

const currentUser = asyncHandler(async  (req,res) => {
  res.json(req.user)
})

module.exports = {registerUser, loginUser, currentUser}