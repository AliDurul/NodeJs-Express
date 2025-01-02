import  { Request, Response } from 'express';

import { createUser, getUserByEmail, updateUserById, deleteUserById } from '../db/users';
import { authentication, random } from '../helpers';

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const user = await getUserByEmail(email);
    
    if (user) {
        res.status(400).send('User already exists');
    } else {

        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication: {
                password: authentication(salt, password),
                salt
            }
        })

        res.status(201).send(user);

    }
}