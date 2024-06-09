import express from 'express';
import {
    adminStats
} from "../controllers/dashboardController.js";
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router();

router.get("/adminStats", verifyToken, adminStats);

export default router;
