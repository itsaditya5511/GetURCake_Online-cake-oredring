import express from "express"
import userModel from "../models/userModel.js"

import { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController, } from '../controller/auth.controller.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
//router object
const router = express.Router()

//routing
//register
router.post('/register', registerController)
    //login
router.post('/login', loginController)
    //answer
router.post('/forgot-password', forgotPasswordController)

//test
router.post('/test', requireSignIn, testController)

router.get('/user_auth', requireSignIn, (req, res) => {
    res.status(200).send({
        ok: true
    });
})

router.get('/admin_auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({
        ok: true
    });
})

router.put('/profile', requireSignIn, updateProfileController)

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//order status update
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
);

export default router;