import express from 'express';
import * as authController from '../controllers/auth.controller';
import * as userController from '../controllers/user.controller';
import * as roomController from '../controllers/room.controller';
import * as reservationController from '../controllers/reservation.controller';

const router = express.Router();

router.post('/auth/register', authController.register)

// TODO
router.post('/auth/login', authController.authenticate)

router.get('/users', userController.getAllUsers)

router.get('/rooms', roomController.getAllRooms)
router.post('/rooms', roomController.createRoom)
router.put('/rooms/:id', roomController.updateRoom)
router.delete('/rooms/:id', roomController.deleteRoom)

router.post('/reservations', reservationController.createReservation)

// TODO
router.get('/reservations', reservationController.getUserReservations)

router.get('/reservations/room/:roomId', reservationController.getRoomReservations)
router.delete('/reservations/:id', reservationController.cancelReservation)

export default router;