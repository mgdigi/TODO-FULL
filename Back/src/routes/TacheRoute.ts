import  { Router } from "express";

import { TacheController } from "../controllers/TacheController.js" 
import { authorized } from "../middlewares/auth.js";
import { upload } from "../middlewares/image.js";

const router = Router();
 

router.get("/",  TacheController.getAll);           
router.get("/:id", TacheController.findById);

router.post("/",  TacheController.create);         
router.put("/:id", authorized, upload.single('image'), TacheController.update);       
router.delete("/:id", authorized,  TacheController.delete);  
router.patch("/:id/:etat", authorized, TacheController.updateEtat);
router.patch("/:id",  authorized, TacheController.update);
router.post("/:id/collaborateurs", authorized, TacheController.addCollaborateur);
router.post('/:id/image',  authorized, upload.single('image'), TacheController.uploadImage)

export default router;
