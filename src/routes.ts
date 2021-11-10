import { Router } from 'express'; 
import RoomController from './controllers/RoomController';
import AuthController from './controllers/AuthController';
import authRequired from './middlewares/authRequired';

const router = Router();

router.get('/', (req, res) => {
    res.redirect('/rooms');
});

router.get('/rooms', authRequired, RoomController.index);
router.get('/rooms/:room_name', authRequired, RoomController.room);

router.get('/login', AuthController.getLogin);
router.post('/login', AuthController.postLogin);
router.get('/signup', AuthController.getSignup);
router.post('/signup', AuthController.postSignup);

export default router;