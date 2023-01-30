const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Joi = require('joi');
const bcrypt = require('bcryptjs');
import {Schema, model} from 'mongoose'


const emailRegexp = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    googleId: {
      type: String,
    },
    recipe: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'recipe',
      default: [],
    }],
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true },
);



userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
};



module.exports =  mongoose.model('User', userSchema);

