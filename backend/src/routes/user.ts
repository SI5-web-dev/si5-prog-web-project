import express from "express";
import * as userCtrl from '../controllers/user.js';

const router = express.Router();

/**
 * Route Signup
 */
 router.post("/signup", userCtrl.signup);


 /**
  * Route Login
  */
 router.post("/login", userCtrl.login);

 export default router;