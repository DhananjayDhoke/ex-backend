const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");


exports.register = async(req,res)=>{
   
    try {
        
        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}

exports.login = async(req,res)=>{
  
   try {
    const {email, password} = req.body;

    const user = await User.findOne({email:email});
    if(!user) res.status(400).json({msg:"User not exist"});

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) res.status(400).json({msg:"Invalid Credentials."});

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
    
      delete user.password
    res.status(200).json({token,user});

   } catch (error) {
    res.status(500).json({message:error.message})
    
   }
    

}