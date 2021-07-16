const database = [    {        id: 1,        name: "Jimmy Smith",        email: "jimmy123@gmail.com",        password: "jimmy123!",        reminder: []    }]

const getUserById = (id) => {
    let user = userModel.findById(id);
    if (user) {
        return user;
    }
    return null;
};

const id = 1;

const userModel = {    findById: (id) => {
        const user = database.find((user) => user.id === id);
        console.log(user);
        if (user) {            return user;        }
        throw new Error(`Couldn't find user with id: ${id}`);    }};


const user = getUserById(id);
console.log(user.id);