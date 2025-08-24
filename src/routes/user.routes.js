import { Router } from "express";
import {registerUser} from "../controllers/user.controller.js "     // we can import it like this because export is not default 
const router = Router()

router.route("/register").post(registerUser)

export default router