import { Request, Response, NextFunction } from 'express'; 
import jwt from 'jsonwebtoken';

export default function authRequired(req: Request, res: Response, next: NextFunction) {
    const token: string = req.cookies.token;
    
    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, process.env.JWT_SECRET ?? '', (err, decoded) => {
        if (err?.name === 'TokenExpiredError') {
            return res.redirect('/login');
        }

        req.body.userId = decoded?.id;
        req.body.userName = decoded?.username;
        req.body.userPassword = decoded?.password;
        next();
    });
}