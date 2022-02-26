import express from "express";
import * as queryCtrl from '../controllers/querys.js';

const router = express.Router();

 router.post("/askStation", queryCtrl.askStation);

 router.post("/historyStation", queryCtrl.historyStation);


 export default router;