const User = require('../schemas/UserSchema');

//Use validate, instead of manually doing it!
//Test with empty req param

exports.userList = (_, res) => {
    User.find({}, (err, docs) => {
        if (err) return res.status(400).json({message: `An error has occurred: ${err}`});

        return res.json(docs);
    });
};
  
exports.userGet = (req, res) => {
    User.findOne({'email': req.params.email}, (err, user) => {
        if (err) return res.status(404).json({message: `No user with email ${req.params.email} was found!`});

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
        if (err) return res.status(400).json({message: `An error has occurred: ${err}`});

        return res.json(newUser);
    });
};

exports.userUpdate = (req, res) => {
    console.log(`Updating ${req.params.email}, setting: ${JSON.stringify(req.body)}`);

    User.updateOne({"email": req.params.email}, {$set: req.body}, {},
        function(err, user){
            if (err) return res.status(400).json({message: `An error has occurred: ${err}`});

            return res.json(`${req.params.email} has been succesfully updated!`);
        }
    );
};

exports.userDelete = (req, res) => {
    console.log(`Deleting ${req.params.email}`);
    
    User.deleteOne({"email": req.params.email}, err => {
        if (err) return res.status(404).json({message: `No user with email ${req.params.email} was found!`});

        return res.json(`${req.params.email} has been successfully deleted!`);
    });
};