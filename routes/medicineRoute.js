import express from 'express';
import {
    saveMedicine,
    getMedicine,
    getListMedicine
} from "../controllers/medicineController.js";
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/saveMedicine", saveMedicine);
router.post("/getMedicine", getMedicine);
router.get("/getListMedicine", getListMedicine);

export default router;
