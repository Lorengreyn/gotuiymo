const bcrypt = require('bcryptjs');

import dbConnect from '../../../lib/dbConnect';

import { User } from'../../../models/user';


export default async function handler (req, res) {
 const {name, email, password} = req.body;
  await dbConnect()

    const hashPassword = await bcrypt.hash(password, 10);
    const user = User.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(201).json({
      user
    });
  }

