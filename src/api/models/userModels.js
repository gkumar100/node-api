const mongoose = require('../../config/db.config');
const schema = {
    fname: { type: mongoose.SchemaTypes.String, required: true },
    lname: { type: mongoose.SchemaTypes.String },
    email: { type: mongoose.SchemaTypes.String, required: true, unique: true },
    dob: { type: mongoose.SchemaTypes.Date, required: true },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
}
const collectionName = "users";
const userSchema = mongoose.Schema(schema);
const User = mongoose.model(collectionName, userSchema);
module.exports = User;