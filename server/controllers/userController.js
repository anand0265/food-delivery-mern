
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const UserModel = require('../models/UserModel')


// Create token
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Register user
const registerUser = async(req,res) =>{
  const {name, password, email} = req.body;
  try {
    // check user exist
    const exist = await UserModel.findOne({email});
    if(exist){
        return res.status(500).send({
            success:false,
            message:"User already exists"
        })
    }
    // validating email format & strong password
    if(!validator.isEmail(email)){
        res.status(500).send({
            success:false,
            message:"Please enter valid email"
        })
    }
    // password validation
    if(password.length<8){
        res.status(500).send({
            success:false,
            message:"Please enter strong password"
        })
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password,salt)

    const newUser = new UserModel({
        name:name,
        email:email,
        password:hashpassword

    })

    const user = await newUser.save()
    const token = createToken(user._id)
    res.status(200).send({
        success:true,
        message:"User Registered Successfully",
        token,
        user

    })
    
  } catch(error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in User Register API"
    })
  }
}

// Login user
const loginUser = async(req,res) => {
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(500).send({
                success:false,
                message:"User not Found"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid Password"
            })
        }
        const token = createToken(user._id)
        res.status(200).send({
            success:"true",
            message:"User Login Successfully",
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Login API"
        })
        
    }

}

module.exports = {registerUser, loginUser}