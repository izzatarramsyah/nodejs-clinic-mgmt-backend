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

router.post("/saveDoctor", verifyToken, saveDoctor);
router.post("/getDoctor", verifyToken, getDoctor);
router.get("/getListDoctor", verifyToken, getListDoctor);
router.post("/deleteDoctor", verifyToken, deleteDoctor);
router.post("/updateDoctor", verifyToken, updateDoctor);

export default router;
