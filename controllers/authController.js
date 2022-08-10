const models = require('../models')
const Validator = require("fastest-validator")
const v = new Validator();
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

// Models
const User = models.User

// Register
const signUp = (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);

    const user = {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        gender: req.body.gender,
        password: hash
    }

    const schema = {
        name: { type: "string", optional: false, max: 300 },
        email: { type: "string", max: 1000 },
        gender: { type: "string", max: 10 },
        contact: { type: "string", max: 20 },
        password: { type: "string" }
    };

    const validation = v.validate(user, schema)

    if (validation != true) {
        return res.status(400).send(validation)
    }

    User.findOne({ where: { 'email': req.body.email } }).then((data) => {
        if (data) {
            res.status(409).send({ 'msg': 'User with this email already exists' })
        } else {
            User.create(user).then((data) => {
                res.status(200).send({ 'msg': 'User created successfully', 'user': data })
            }).catch((err) => {
                res.status(500).send({ 'msg': 'Error creating user', 'error': err })
            })
        }
    }).catch((err) => {
        res.status(500).send({ 'msg': 'Error finding user', 'error': err })
    })
}

// Login
const Login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    const schema = {
        email: { type: "string", max: 1000 },
        password: { type: "string" }
    };

    const validation = v.validate(user, schema)
    if (validation != true) {
        return res.status(400).send(validation)
    }

    User.findOne({ where: { email: req.body.email } }).then((data) => {
        if (data === null) {
            return res.status(404).send({ 'msg': 'Invalid credentials' })
        }
        const compare_pwd = bcrypt.compareSync(req.body.password, data.password);
        if (compare_pwd) {
            const token = jwt.sign({
                email: data.email,
                user_id: data.id,
            }, process.env.JWT_SECRETE, (err, token) => {
                return res.status(200).send({
                    'msg': 'User Authentication successfully',
                    'token': token
                })
            })
        } else {
            return res.status(404).send({ 'msg': 'Invalid credentials' })
        }

    })
}

module.exports = {
    signUp,
    Login
}