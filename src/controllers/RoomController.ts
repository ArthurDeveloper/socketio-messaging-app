import { Request, Response } from 'express';

export default {
    index(req: Request, res: Response) {
        return res.render('rooms/select-room.ejs');
    },
    room(req: Request, res: Response) {
        if (req.params.room_name) {
            const rooms: string[] = ['misc', 'frontend', 'backend', 'mobile', 'games'];

            if (rooms.includes(req.params.room_name)) {   
                const capitalize = (str: string) => {
                    let capitalized = str[0].toUpperCase() + str.substr(1, str.length);
                    return capitalized;
                }

                return res.render(`rooms/room.ejs`, { 
                    room_name: capitalize(req.params.room_name),
                    username: req.body.userName
                });
            } else {
                res.status(400);
                return res.json({
                    error: 'Invalid room'
                });
            }
        } else {
            res.status(400);
            return res.json({ 
                error: 'You must pass a room as a slug in the URL'
            });
        }
    }
}