import {Request, Response, NextFunction} from "express"
import { ErreurMessages } from "../utils/errorsMessage.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { TacheService } from "../services/TacheService.js";
import { TacheWithCollaborateurs } from "../types/authRequest.js";

const service = new TacheService();


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ message: ErreurMessages.TOKEN_MANQUANT });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token!);
    (req as any ).user = decoded; 
    return next();
  } catch (error) {
    return res.status(403).json({ message: ErreurMessages.TOKEN_INVALID });
  }
};

export const authorized = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const todo = await service.findById(Number(req.params.id)) as TacheWithCollaborateurs;
        
        if (!todo) {
            return res.status(404).json({ message: ErreurMessages.TACHENONTROUVE});
        }
        const userId = (req as any).user.userId;
        
        if (userId === todo.userId || todo.collaborateurs.some(c => c.id === userId)) {
            res.json({message : ErreurMessages.ACCESALLOWED})
            return next();
        }

        return res.status(403).json({ message: ErreurMessages.ACCESREFUSE });

    } catch (error) {
        return res.status(403).json({ message: ErreurMessages.ACCESREFUSE });
    }
};




