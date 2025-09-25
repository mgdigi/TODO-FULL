import {Router} from "express"
import { UserController } from "../controllers/UserController.js";


const router = Router();

router.get("/", UserController.findAll);
router.get("/:id", UserController.findById)


export default router;