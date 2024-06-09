import express from 'express';
import {
  getPatient,
  savePatient,
  getListPatient,
  deletePatient,
  updatePatient
} from "../controllers/patientController.js";
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/getPatient", verifyToken, getPatient);
router.get("/getListPatient", verifyToken, getListPatient);
router.post("/savePatient", verifyToken, savePatient);
router.post("/deletePatient", verifyToken, deletePatient);
router.post("/updatePatient", verifyToken, updatePatient);

export default router;
