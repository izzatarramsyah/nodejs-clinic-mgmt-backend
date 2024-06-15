import express from 'express';
import {
    adminStats,
    patientStats,
    doctortStats
} from "../controllers/dashboardController.js";
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router();

router.get("/adminStats", adminStats);
router.post("/patientStats", patientStats);
router.post("/doctortStats", doctortStats);

export default router;
