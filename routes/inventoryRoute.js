import express from 'express';
import {
    saveInventory,
    getInventory
} from "../controllers/inventoryController.js";
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/saveInventory", verifyToken, saveInventory);
router.post("/getInventory", verifyToken, getInventory);

export default router;
