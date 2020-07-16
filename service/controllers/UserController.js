// const users = [
//     {
//         id: 1,
//         name: 'Suhayb Y',
//         email: 'suhayb@cansheep.ca'
//     },
//     {
//         id: 2,
//         name: 'Kip D',
//         email: 'kip@cansheep.ca'
//     },
// ];

// exports.userList = (req, res) => {
//     res.json(users);
// };
  
// exports.userGet = (req, res) => {
//     const found = users.some(user => user.id === parseInt(req.params.id));

//     if (!found)
//         return res.status(404).json({message: `No user with ID ${req.params.id} was found!`});
    
//     res.json(users.filter(user => user.id === parseInt(req.params.id)));
// };

// exports.userCreate = (req, res) => {
//     console.log("Creating a new user...");

//     const newUser = {
//         id: users.length+1,
//         name: req.body.name,
//         email: req.body.email
//     };

//     if (!newUser.name || !newUser.email)
//         return res.status(400).json({message: "Name and email are both required fields!"});
    
//     users.push(newUser);
//     res.json(newUser);
// };

// exports.userUpdate = (req, res) => {
//     console.log(`Updating user with ID ${req.params.id}`);

//     const found = users.some(user => user.id === parseInt(req.params.id));

//     if (!found)
//         return res.status(404).json({message: `No user with ID ${req.params.id} was found!`});
    
//     users.forEach(user => {
//         if (user.id === parseInt(req.params.id)) {
//             user.name = req.body.name ? req.body.name : user.name;
//             user.email = req.body.email ? req.body.email : user.email;

//             res.json(user);
//         }
//     });
// };

// exports.userDelete = (req, res) => {
//     console.log(`Deleting user with ID ${req.params.id}`);

//     const found = users.some(user => user.id === parseInt(req.params.id));

//     if (!found)
//         return res.status(404).json({message: `No user with ID ${req.params.id} was found!`});

//     res.json({message: `User ${req.params.id} has been deleted!`, users: users.filter(user => user.id !== parseInt(req.params.id))});
// };

const User = require('../schemas/UserSchema');

//Use validate, instead of manually doing it!

exports.userList = (req, res) => {
    User.find({}, (err, docs) => {
        if (err) return res.status(404).json({message: `An error has occurred: ${err}`});

        return res.json(docs);
    });
};
  
exports.userGet = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(404).json({message: `No user with ID ${req.params.id} was found!`});

        return res.json(user);
    });
};

exports.userCreate = (req, res) => {
    console.log("Creating a new user...");

    // const newUser = new User({
    //     name: req.body.name,
    //     email: req.body.email
    // });
    const newUser = new User(req.body);
    
    newUser.save(err => {
        if (err) return res.status(404).json({message: `An error has occurred: ${err}`});

        return res.json(newUser);
    });
};

exports.userUpdate = (req, res) => {
    console.log(`Updating ${req.params.id}, setting: ${JSON.stringify(req.body)}`);

    User.updateOne({"_id": req.params.id}, {$set: req.body}, {},
        function(err, user){
            if (err) return res.status(404).json({message: `An error has occurred: ${err}`});

            return res.json(`${req.params.id} has been succesfully updated!`);
        }
    );
};

exports.userDelete = (req, res) => {
    console.log(`Deleting ${req.params.id}`);
    
    User.deleteOne({"_id": req.params.id}, err => {
        if (err) return res.status(404).json({message: `No user with ID ${req.params.id} was found!`});

        return res.json(`${req.params.id} has been successfully deleted!`);
    });
};