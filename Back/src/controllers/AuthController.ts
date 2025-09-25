import { Request , Response } from "express";
import { UserService } from "../services/UserService.js";
import { generateAccessToken } from "../utils/jwt.js";
import { ErreurMessages } from "../utils/errorsMessage.js";
import { CreateUserSchema } from "../validator/UserValidator.js";
import { User } from "@prisma/client";
import bcrypt from "bcrypt"


const service = new UserService()

export class AuthController {

     static async login (_req: Request , res : Response ) {
            const {login , password} = _req.body;
            try {
                const user =  await service.getByEmail(login);
                const isPasswordValid = await service.verifyPassword(password, user!.password);
    
                if(!isPasswordValid) {
                     res.status(403).json({message : ErreurMessages.PASSWORDINVALID})
                }
    
                const accessToken = generateAccessToken(user!.id);
                return res.status(200).json({
                user,
                success: true,
                accessToken
                });
                } catch (error) {
                    console.error(error);
                    return ;
                }  
              }

         static async register(_req : Request , res: Response) {
        try {
            const data =  CreateUserSchema.parse(_req.body) as Omit<User, "id">;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt)
            const userData = {
                ...data, 
                password : hashedPassword
            }
            const user = await service.create(userData);

            res.status(201).json({user, message : ErreurMessages.USERNOTFOUND })

        } catch (error: any) {
            const errors = error.errors ?? [{ message: error.message }];
            res.status(400).json({ errors });
        }
    }
    
}