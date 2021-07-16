const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {        
  let user = userModel.findOne(email);                            
  if (user) {                                                     // database에 user가 있으면, 여기서 user
    if (isUserValid(user, password)) {                            // db에서 user, browser에서 password
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
}


module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};
