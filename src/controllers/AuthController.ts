import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { User as UserType } from '@prisma/client'; 


async function generateAuthToken(data: { user: UserType, password: string } ): Promise<string | null> {
    const { user, password } = data;
    bcrypt.compare(password, user?.password ?? '', (err, result) => {
        if (err) {
            return false;
        }

        if (result) {
            const id = user?.id;
            const username = user?.name;
            const password = user?.password;
            const token = jwt.sign({ id, username, password },
                process.env.JWT_SECRET ?? '', {
                expiresIn: 60 * 60 * 24 * 7
            });

            return token;
        } else {
            return null;
        }
    });

    return null;
}

export default {
    getLogin(req: Request, res: Response) {
        return res.render('login.ejs');
    },
    async postLogin(req: Request, res: Response) {
        if (req.body.username && req.body.password) {
            const user = await User.getByName(req.body.username);
            if (user === null) {
                return res.render('login.ejs', { error: 'Your username is invalid' });
            }
            const password = req.body.password;

            const token = await generateAuthToken({ user, password }); 

            if (token) {
                res.cookie('token', token, {
                    maxAge: 60 * 60 * 24 * 7
                });
                return res.redirect('/rooms');
            } else {
                return res.render('login.ejs', { error: 'Your password is invalid' });
            }
        }

        res.status(400);
        return res.render('login.ejs', { error: 'You must pass both username and password'});
    },
    getSignup(req: Request, res: Response) {
        return res.render('signup.ejs');
    },
    async postSignup(req: Request, res: Response) {
        if (!(req.body.username || req.body.password)) {
            res.status(400);
            return res.json({
                error: 'You must pass the name and the password of the user'
            });
        }
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                res.status(500);
                return res.json({
                    error: err
                });
            } 
            const user = await User.create(req.body.username, hash);
            const password = req.body.password;

            if (user === null) {
                res.status(500);
                return res.json({
                    error: 'Error while trying to create the user'
                });
            }

            const token = await generateAuthToken({ user, password });
            res.cookie('token', token, {
                maxAge: 60 * 60 * 24 * 7
            });
            return res.redirect('/rooms');
        });
    }
};