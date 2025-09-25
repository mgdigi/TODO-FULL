import { Request , Response } from "express";
import { UserService } from "../services/UserService.js";


const  service = new UserService();

export class UserController {

    static async findAll(_req : Request, res : Response){
        try{
            const users = await  service.findAll();
            res.json(users);
        } catch ( error: any ) {
            res.status(500).json({ error: error.message });
        }
    }

    static async findById(_req : Request, res : Response){
        try{
            const id = Number(_req.params.id);
            const user = await service.findById(id);
            return res.json(user)
        }catch (error: any) {
           return res.status(400).json({ error: error.message });
        }
    }

   


}
    
    
