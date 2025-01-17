import express from "express";
import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js"
import {
    createCategoryController,
    updateCategoryController,
    categoryControlller,
    singleCategoryController,
    deleteCategoryCOntroller
} from "./../controller/creteCategoryController.js"

const router = express()

//routes
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)
router.get('/get-category', categoryControlller)
router.get('/single-category/:slug', singleCategoryController)
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryCOntroller)



export default router