import express from 'express';
import {
    saveVisitHistory,
    getListHistory,
    getHistory
} from "../controllers/visitHistoryController.js";
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/saveVisitHistory", verifyToken, saveVisitHistory);
router.get("/getListHistory", verifyToken, getListHistory);
router.post("/getHistory", verifyToken, getHistory);

export default router;
