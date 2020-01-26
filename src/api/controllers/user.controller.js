const httpStatus = require('http-status');
const responseService = require('../services/response.service');
const userModel = require('../models/userModels')
const userService = require('../services/user.service');
const saltRounds = 10;
const bcrypt = require('bcryptjs');
exports.me = (req, res, next) => {
	try {
		const { name } = req.query;
		const response = responseService.greetUser(name);
		res.status(httpStatus.OK).json(response);
	} catch (e) {
		next(e);
	}
};
exports.createUser = (req, res, next) => {
	try {
		let fname = req.body.fname;
		let lname = req.body.lname;
		let email = req.body.email;
		let password = req.body.password;
		let dob = req.body.dob;
		var salt = bcrypt.genSaltSync(saltRounds);
		var hash = bcrypt.hashSync(password, salt);
		let data = {
			fname: fname,
			lname: lname,
			email: email,
			password: hash,
			dob: dob,
		}
		userService.createNewUser(data).then(user => user ? res.json(user) : res.status(400).json({ message: "User not created" }));
	} catch (e) {
		res.json(e.errors);
	}
}
exports.authenticate = (req, res, next) => {
	userService.authenticate(req.body)
		.then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
		.catch(err => next(err));
}
exports.getAllUser = (req, res, next) => {
	console.log('dasD');
	userService.getAllUser().then(response => response ? res.json(response) : res.status(400).json({ message: "Record not found" })).catch(err => next(err));
}
exports.updateUser = (req, res, next) => {
	try {
		let updateData = {
			id: req.body.id,
			fname: req.body.fname,
			lname: req.body.lname,
			email: req.body.email,
			dob: req.body.dob
		}
		userService.updateUser(updateData).then(user => user ? res.json(user) : res.status(400).json({ message: "Record not found" })).catch(errors => next(errors));
	} catch (exception) {
		res.json(exception.errors);
	}
}
exports.deleteUser = (req, res, next) => {
	try {
		const id = req.query.id;
		console.log('id',id);
		userService.deleteUser(id).then(user => user ? res.json(user) : res.status(400).json({ message: "Record not found" })).catch(errors => next(errors));
	} catch (exception) {
	}
}
