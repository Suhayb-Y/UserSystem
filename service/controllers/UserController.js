const jwt = require('jsonwebtoken');
const User = require('../schemas/UserSchema');

//Use validate, instead of manually doing it!
//Test with empty req param

exports.getJWT = (req, res) => {
    if (!req.cookies.token)
        return res.status(401).json({message: 'Please login!'});
    return jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: 'Invalid or expired token!'});
        return res.status(200).json(jwt.decode(req.cookies.token));
    });
};

exports.userList = (req, res) => {
    if (!req.user.admin) return res.sendStatus(401).json({message: 'Unauthorized action!'});
    User.find({}, (err, docs) => {
        if (err) return res.status(400).json({message: `An error has occurred: ${err}`});

        return res.json(docs);
    });
};
  
exports.userGet = (req, res) => {
    User.findOne({'email': req.params.email}, (err, user) => {
        if (err) return res.status(400).json({message: `An error has occurred: ${err}`});
        if (!user) return res.status(404).json({message: `No user with email ${req.params.email} was found!`});

        return res.json(user);
    });
};

exports.userCreate = (req, res) => {
    console.log("Creating a new user...");

    const newUser = new User(req.body);
    
    newUser.save(err => {
        if (err) return res.status(400).json({message: `An error has occurred: ${err}`});

        return res.json(newUser);
    });
};

exports.userLogin = (req, res) => {
    console.log("Logging in...");

    User.findOne({'email': req.body.email}, (err, user) => {
        if (err) return res.status(400).json({message: `An error has occurred: ${err}`});
        if (!user) return res.status(404).json({message: `No user with email ${req.body.email} was found!`});
        if (user.password !== req.body.password) 
            return res.status(400).json({message: `Incorrect password for ${req.body.email}`});

        //Generate and pass the token
        const admin = user.rank === "admin" ? true : false;
        const token = jwt.sign({ email: req.body.email, admin }, 
            process.env.JWT_SECRET, { expiresIn: 60*30 }
        );

        res.cookie('token', token, { httpOnly: true });

        return res.json({message: 'Successfully logged in!', token });
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