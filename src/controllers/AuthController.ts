import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import bcrypt from 'bcrypt';


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

            bcrypt.compare(req.body.password, user?.password, (err, result) => {
                if (err) {
                    res.status(500);
                    return res.json({ error: err });
                }

                if (result) {
                    const id = user?.id;
                    const username = user?.name;
                    const password = user?.password;
                    const token = jwt.sign({ id, username, password },
                        process.env.JWT_SECRET ?? '', {
                        expiresIn: 60 * 60 * 24 * 7
                    });

                    res.cookie('token', token, {
                        maxAge: 60 * 60 * 24 * 7
                    });

                    return res.redirect('/rooms');
                } else {
                    return res.render('login.ejs', { error: 'Your password is invalid' });
                }
            });
        } else {
            res.status(400);
            return res.render('login.ejs', { error: 'You must pass both username and password'});
        }
    },
    getSignup(req: Request, res: Response) {
        return res.render('signup.ejs');
    },
    async postSignup(req: Request, res: Response) {
        if (req.body.username && req.body.password) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    res.status(500);
                    return res.json({
                        error: err
                    });
                }

                User.create(req.body.username, hash)
                    .then(() => {
                        return res.redirect('/rooms');
                    });
            })
        } else {
            res.status(400);
            return res.json({
                error: 'You must pass the name and the password of the user'
            });
        }
    }
};