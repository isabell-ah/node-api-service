const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must not be negative');
      }
    },
  },
  email: {
    type: String,
    required: true,
    // validate(value) {
    //   if (!validator.isEmail(value)) throw new Error('It should be an email');
    // },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
});
userSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error();

   return user;
  } catch (err) {
    throw new Error(err);
  }
};

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(this.password, 8);
  // if (user.isModified('password')) {
  user.password = await bcrypt.hash(user.password, 8);
  // }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
