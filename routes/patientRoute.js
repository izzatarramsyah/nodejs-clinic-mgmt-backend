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

router.post("/getPatient", getPatient);
router.get("/getListPatient", getListPatient);
router.post("/savePatient", savePatient);
router.post("/deletePatient", deletePatient);
router.post("/updatePatient", updatePatient);

export default router;
