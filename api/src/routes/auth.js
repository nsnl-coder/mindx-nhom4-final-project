const express=require('express');
const {login,register,fotgotPassword,ResetPassword,requestResetPassword} =require('../controllers/auth');
const router=express.Router();
router.post('/register',register);
router.post('/login',login);
router.post('/forgot-password',fotgotPassword);
router.post('/reset-password/:id/:token',ResetPassword);
router.get('/reset-password/:id/:token',requestResetPassword);
module.exports=router;