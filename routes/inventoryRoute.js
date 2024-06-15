import express from 'express';
import {
    saveInventory,
    getInventory
} from "../controllers/inventoryController.js";
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/saveInventory", saveInventory);
router.post("/getInventory", getInventory);

export default router;
