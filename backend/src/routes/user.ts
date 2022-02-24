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

/**
 * Route AddFavorite
 */
router.post("/addFavorite", userCtrl.addFavorite);

/**
 * Route RemoveFavorite
 */
router.post("/removeFavorite", userCtrl.removeFavorite);

/**
 * Route getFavoritesStation
 */
router.post("/listStationFav", userCtrl.getListStationFav);

 export default router;