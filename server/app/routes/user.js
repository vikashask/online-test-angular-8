let User = require('../models/user');
/*
 * GET /User route to retrieve all the Users.
 */
function getUsers(req, res) {
    try {
        //Query the DB and if no errors, send all the Users
        let query = User.find({});
        query.exec((err, Users) => {
            if (err) res.send(err);
            //If no errors, send them back to the client
            res.json(Users);
        });
    } catch (e) {
        res.send({
            error: e,
        });
    }

}

let userbyid = async (req, res) => {
    try {
        console.log("req.params.id", req.params);

        if (req.params.id) {
            let userData = await User.findOne({
                _id: req.params.id,
            }, {
                password: 0
            });
            if (userData) {
                res.send({
                    data: userData,
                });
            }
        } else {
            let userData = await User.find();
            if (userData) {
                res.send({
                    data: userData,
                });
            }
        }
    } catch (e) {
        console.log("error", e);
        res.send({
            error: e,
        });
    }
}

let postUser = async (req, res) => {
    try {
        let userData = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });
        if (userData) {
            res.send({
                message: "User already exist with this email ! try with another email",
            });
        } else {
            // create new user
            let newUser = new User(req.body);
            // saveing heres
            newUser.save(
                (err, user) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({
                            message: "User addd!",
                            user
                        });
                    }
                }
            );
        }
    } catch (e) {
        console.log("error", e);
        res.send({
            error: e,
        });
    }

}

function login(req, res) {
    try {
        console.log(req.body, 'login data---');
        User.findOne({
            email: req.body.email,
            password: req.body.password
        }, (function (error, data) {
            res.json(data);
        }));
    } catch (e) {
        console.log("error", e);
        res.send({
            error: e,
        });
    }

}

let register = async (req, res) => {
    try {
        let userData = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });
        if (userData) {
            res.send({
                message: "Email is exist! try with another email",
            });
        } else {
            // create new user
            let newUser = new User(req.body);
            // saveing heres
            newUser.save(
                (err, user) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({
                            message: "User addd!",
                            user
                        });
                    }
                }
            );
        }
    } catch (e) {
        console.log("error", e);
        res.send({
            error: e,
        });
    }

}

let editUser = async (req, res) => {
    try {
        if (req.body._id) {
            const filter = {
                _id: req.body._id
            };
            const update = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age
            };
            let doc = await User.findOneAndUpdate(filter, update);
            res.send({
                message: "User updated!",
            });
        } else {
            res.send({
                message: "user id missing",
            });
        }
    } catch (e) {
        console.log("error", e);
        res.send({
            error: e,
        });
    }

}

let deleteUser = async (req, res) => {
    try {
        let deleteUser = await User.deleteOne({
            _id: req.body._id
        });
        console.log("delete", deleteUser);
        if (deleteUser) {
            res.send({
                message: "User deleted!",
            });
        }
    } catch (e) {
        console.log("error", e);
        res.send({
            error: e,
        });
    }

}

module.exports = {
    getUsers,
    login,
    register,
    postUser,
    editUser,
    deleteUser,
    userbyid
};