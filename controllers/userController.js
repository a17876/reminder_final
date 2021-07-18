const userModelFile = require("../models/userModel");
const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {        
  let user = userModel.findOne(email);                            
  if (user) {                                                     
    if (isUserValid(user, password)) {                            
      return user;
    }
  }
  return null;
};


const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};


function isUserValid(user, password) {
  return user.password === password;
};

const getUserByGitHubIdOrCreate = (profile) => {
  console.log(`my profile id is = ${profile.id}`);
  let user = userModel.findById(profile.id);
  if (user) {
    return user;
  }
  let newUser = {
    id: profile.id,
    name: profile.username,
    email: null,
    password: null,
    reminders: []
  };
userModelFile.database.push(newUser);
getUserByGitHubIdOrCreate(profile);
};

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGitHubIdOrCreate
};
