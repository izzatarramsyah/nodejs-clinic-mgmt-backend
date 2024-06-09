import express from 'express';
import {
    saveMedicine,
    getMedicine,
    getListMedicine
} from "../controllers/medicineController.js";
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/saveMedicine", verifyToken, saveMedicine);
router.post("/getMedicine", verifyToken, getMedicine);
router.get("/getListMedicine", verifyToken, getListMedicine);

export default router;
