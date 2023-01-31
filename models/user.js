const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcryptjs');
mongoose.set('strictQuery', true);


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


module.exports =  mongoose.model.User || mongoose.model('User', userSchema)

