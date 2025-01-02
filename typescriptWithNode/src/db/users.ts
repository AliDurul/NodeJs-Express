import e from "express";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    authentication: {
        password: { type: String, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    }
});


export const User = mongoose.model('User', UserSchema);

export const getUsers = () => User.find();
export const getUserByEmail = (email: string) => User.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => User.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => User.findById(id);
export const createUser = (values: Record<string, any>) => new User(values).save().then((user) => user.toObject());
export const updateUserById = (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values, { new: true }).then((user) => user.toObject());
export const deleteUserById = (id: string) => User.findOneAndDelete({ _id: id });
