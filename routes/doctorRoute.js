import express from 'express';
import {
    saveDoctor,
    getListDoctor,
    getDoctor,
    updateDoctor,
    deleteDoctor
} from "../controllers/doctorController.js";
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/saveDoctor", saveDoctor);
router.post("/getDoctor", getDoctor);
router.get("/getListDoctor", getListDoctor);
router.post("/deleteDoctor", deleteDoctor);
router.post("/updateDoctor", updateDoctor);

export default router;
