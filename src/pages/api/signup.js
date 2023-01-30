import * as bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/dbConnect';
const mongoose = require('mongoose');

const User = mongoose.model('User')

export default async function handler (req, res) {
    await dbConnect()
  const {name, email, password} = req.body;
//   try{
//   const userCheck =  User.findOne({email});
//   if(userCheck){
//    return res.status(401).json("error")
//   }  
// }
// catch{
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      user
    });
    }
  // }
