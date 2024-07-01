import express from 'express';
import {
    saveMedicalRecord,
    getHistory,
    getHistoryByDoctor
} from "../controllers/medicalRecordController.js";
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/save",saveMedicalRecord);
router.post("/getHistory",getHistory);
router.post("/getHistoryByDoctor",getHistoryByDoctor);

export default router;
