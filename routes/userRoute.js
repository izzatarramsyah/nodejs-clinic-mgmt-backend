import express from 'express';
import {
  getUser,
  register,
  login,
  logout
} from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js"
import refreshToken from "../middleware/refreshToken.js"

const router = express.Router();

router.post("/getUser", getUser);
router.post("/login", login);
router.post("/register", register);
router.get("/getToken", refreshToken); 
router.post("/logout", logout);

export default router;
