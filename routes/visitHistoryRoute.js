import express from 'express';
import {
    saveVisitHistory,
    getListHistory,
    getHistory,
    getTodayVisit,
    updateVisitHistory,
    getListTodayVisit,
    getHistoryByDoctor
} from "../controllers/visitHistoryController.js";
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/saveVisitHistory", saveVisitHistory);
router.get("/getListHistory", getListHistory);
router.post("/getHistory", getHistory);
router.post("/getTodayVisit", getTodayVisit);
router.post("/updateVisitHistory", updateVisitHistory);
router.post("/getListTodayVisit", getListTodayVisit);
router.post("/getHistoryByDoctor", getHistoryByDoctor);

export default router;
