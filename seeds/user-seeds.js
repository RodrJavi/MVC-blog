const { User } = require("../models");
const bcrypt = require("bcrypt");

const seedUsers = async () => {
  // Stores already hashed passwords into seeded usernames
  const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
  };
  const userData = [
    {
      username: "Javi",
      password: await hashPassword("Rodr"),
    },
    {
      username: "Jacob",
      password: await hashPassword("Long"),
    },
    {
      username: "Ian",
      password: await hashPassword("Martin"),
    },
  ];
  User.bulkCreate(userData);
};

module.exports = seedUsers;
