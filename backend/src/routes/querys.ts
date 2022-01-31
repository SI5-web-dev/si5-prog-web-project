import express from "express";
import * as queryCtrl from '../controllers/querys.js';

const router = express.Router();

/**
 * Route Signup
 */
 router.post("/proximity", queryCtrl.proximity);


 /**
  * Route Login
  */
 router.post("/cheapest", queryCtrl.cheapest);

 export default router;