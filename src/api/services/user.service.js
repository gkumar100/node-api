const jwt = require('jsonwebtoken');
const config = { secret: process.env.JWT_SECRET };
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModels');
module.exports = {
    authenticate,
    getAll,
    createNewUser,
    getAllUser,
    updateUser,
    deleteUser
}
async function authenticate({ username, password }) {
    const user = await userModel.findOne({ email: username });
    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return { userWithoutHash, token };
    }
}
async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}
async function createNewUser(userData) {
    try {
        let userName = userData.email;
        const getUser = await userModel.findOne({ email: userName });
        if (!getUser) {
            const response = await userModel.create(userData);
            console.log('response', response)
            return response;
        } else {
            return { status: 400, error: "Record already exist" };
        }
    } catch (e) {
        return e.errors;
    }
}
async function updateUser(userData) {
    try {
        let id = userData.id;
        let updateData = {
            fname: userData.fname,
            lname: userData.lname,
            email: userData.email,
            dob: userData.dob
        }
        let email = userData.email;
        const user = await userModel.findOne({ $and: [{ email: email }, { _id: { $ne: id } }] });
        if (!user) {
            const response = await userModel.updateOne({ _id: id }, updateData);
            return response;
        }
    } catch (e) {
        return e.errors;
    }
}
async function getAllUser() {
    try {
        const userList = await userModel.find({}, { password: 0, __v: 0 });
        if (userList) {
            return userList;
        } else {
            return { status: 400, error: "Record Not found" };
        }
    } catch (exception) {
        return exception.errors;
    }
}
async function deleteUser(id){
    try{
        const response = await userModel.deleteOne({_id:id});
        if(response){
            return true
        }else {
            return { status: 400, error: "Record Not deleted" };
        }

    }catch(exception){
        return exception.errors;
    }
}