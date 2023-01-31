import * as bcrypt from 'bcryptjs';

const mongoose = require('mongoose');
import dbConnect from '../../../lib/dbConnect';
const User = mongoose.model('User')

export default async function handler (req, res, next) {
    await dbConnect()
  const {name, email, password} = req.body;
  const userCheck = await User.findOne({email});
  if(userCheck){
    res.status(401).json("Користувач вже існує!")
  } else{
try{
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
    catch (error) {
      console.log(error);
      // checking validation
      if (error.name === "ValidationError") {
          
          const message = Object.values(error.errors).map(value => value.message);
          return res.status(400).json({
              error: message
          })
      }
      res.status(400).json(error.message)
  }}
}
