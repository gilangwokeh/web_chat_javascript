const mongoose = require('mongoose');
const { isEmail } = require('validator');

const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Can't be blank"]
  },
  email: {
    type: String,
    loworcase: true,
    unique: true,
    required: [true, "can't be blank"],
    index: true,
    validate: [isEmail, 'invalid email']
  },
  password: {
    type: String,
    required: [true, "can't be blank"]
  },
  picture: {
    type: String,
  },
  newMessages: {
    type: Object,
    default: {}
  },
  status: {
    type: String,
    default: 'online'
  }
},
  { minimize: false });

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt((saltError, salt) => {
    if (saltError) return next(saltError);

    bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) return next(hashError);

      user.password = hash;
      next();

    });
  });

});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('invalid email or password');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('invalid email or password')
  return user
}

const User = mongoose.model('User', UserSchema)
module.exports = User