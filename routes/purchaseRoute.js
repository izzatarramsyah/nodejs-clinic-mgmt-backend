import express from 'express';
import {
    purchaseMedicine,
    history
} from "../controllers/purchaseController.js";
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/medicine",verifyToken, purchaseMedicine);
router.post("/history", verifyToken, history);

export default router;
