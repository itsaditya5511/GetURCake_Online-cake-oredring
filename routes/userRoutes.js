import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {

    getUsers,
    getUserById
} from "../controller/userController.js";

const router = express.Router();

// Routes
router.get('/get-users/email/:email', requireSignIn, isAdmin, getUsers); // Updated route to handle search by email
router.get('/get-user/:id', requireSignIn, isAdmin, getUserById);

export default router;