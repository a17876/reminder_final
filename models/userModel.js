// const userController = require("../controllers/userController");

const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    reminders: []
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    reminders: []
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    reminders: []
  }
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);     // 
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (profileId) => {
    const user = database.find((user) => user.id === profileId);
    if (user) {
      return user;
    } return false;
  },
};

module.exports = { database, userModel };
