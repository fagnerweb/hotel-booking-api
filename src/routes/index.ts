import express from 'express';
import * as authController from '../controllers/auth.controller';
import * as userController from '../controllers/user.controller';
import * as roomController from '../controllers/room.controller';
import * as reservationController from '../controllers/reservation.controller';
import { authenticate, authorizeAdmin } from '../libs/jwt';

const router = express.Router();

router.post('/auth/register', authController.register)

// TODO
router.post('/auth/login', authController.authenticate)

router.get('/users', authenticate, authorizeAdmin, userController.getAllUsers)

router.get('/rooms', authenticate, roomController.getAllRooms)
router.post('/rooms', authenticate, authorizeAdmin, roomController.createRoom)
router.put('/rooms/:id', authenticate, roomController.updateRoom)
router.delete('/rooms/:id', authenticate, roomController.deleteRoom)

router.post('/reservations', authenticate, reservationController.createReservation)

// TODO
router.get('/reservations', authenticate, authorizeAdmin, reservationController.getUserReservations)

router.get('/reservations/room/:roomId', authenticate, reservationController.getRoomReservations)
router.delete('/reservations/:id', authenticate, authorizeAdmin, reservationController.cancelReservation)

export default router;