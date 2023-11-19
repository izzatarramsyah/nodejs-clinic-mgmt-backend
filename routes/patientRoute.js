import express from 'express';
import {
  getPatient,
  savePatient
} from "../controllers/patientController.js";
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/getPatient", verifyToken, getPatient);
router.post("/savePatient", verifyToken, savePatient);

export default router;
