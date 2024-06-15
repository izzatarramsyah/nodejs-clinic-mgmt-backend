import express from 'express';
import {
    saveMessage,
    getListMessage
} from "../controllers/messageController.js";
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/saveMessage", saveMessage);
router.post("/getListMessage", getListMessage);

export default router;
