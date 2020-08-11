const mongoose = require('mongoose');
const argon2 = require('argon2');
const { getConfig } = require('../config/config');
const { User } = require('../models/User');

const updateHashes = async () => {
  try {
    // connect to database
    await mongoose.connect(getConfig('connectionString'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.Promise = global.Promise;
    const cursor = User.find().cursor();
    await cursor.eachAsync(async (user) => {
      try {
        if (user.password.startsWith('$argon')) {
          throw new Error('Password already hashed with argon!');
        }
        const newHash = await argon2.hash(user.password);
        user.password = newHash;
        await user.save();
      } catch (e) {
        console.error(e);
      }
    });

    mongoose.connection.close();
  } catch (e) {
    console.error(e);
  }
};
updateHashes();