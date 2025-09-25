import  { Request, Response } from "express";
import {  Tache, ETAT } from "@prisma/client";
import { TacheService } from "../services/TacheService.js";
import { CreateTacheSchema, UpdateTacheShema } from "../validator/TacheValidator.js"; 
import { ErreurMessages } from "../utils/errorsMessage.js";

const service = new TacheService();

export class TacheController {
   static async getAll(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;
    const filter = req.query.filter as string;

    const userId = (req as any).user.userId;

    const taches = await service.findAll(userId , skip, limit, filter);
    const total = await service.countAll(userId, filter);

    res.json({
      data: taches,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}




    static async findById(req: Request, res: Response) {
        try {
            const id: number = Number(req.params.id);
            const Tache = await service.findById(id);
            if (!Tache) {
                return res.status(404).json({ error: ErreurMessages.USERNOTFOUND });
            }
            return res.json(Tache);
        } catch (error: any) {
           return res.status(400).json({ error: error.message });
        }
    }
    

    static async create(req: Request, res: Response) {
        try {
            const data = CreateTacheSchema.parse(req.body) as Omit<Tache, "id">;
            const newTache = {
                ...data,
                userId : (req as any).user.userId,
            }
            const Tache = await service.create(newTache);

            res.status(201).json(Tache);
        } catch (error: any) {
            const errors = error.errors ?? [{ message: error.message }];
            res.status(400).json({ errors });
        }
    }

  
    static async update(req: Request, res: Response) {
        try {
            const id: number = Number(req.params.id);
            const data = UpdateTacheShema.parse(req.body) as Partial<Omit<Tache, "id" >>;

            const Tache = await service.update(id, data);
            res.json(Tache);
        } catch (error: any) {
            const errors = error.errors ?? [{ message: error.message }];
            res.status(400).json({ errors });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id: number = Number(req.params.id);
            await service.delete(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateEtat(req: Request, res: Response) {
    try {
        const id: number = Number(req.params.id);
        const newEtat: ETAT = req.params.etat as ETAT;
        
        const updateData = { etat: newEtat };
        
        const tache = await service.update(id, updateData);
        res.status(200).json({
            data: tache, 
            message: ErreurMessages.ETATCHANGE
        });

    } catch (error: any) {
        const errors = error.errors ?? [{ message: error.message }];
        res.status(400).json({ errors });
    }
    }

static async addCollaborateur(req: Request, res: Response) {
  try {
    const tacheId = Number(req.params.id);
    const userIds: number[] = req.body.userIds; 
    
    if (!Array.isArray(userIds)) {
      return res.status(400).json({ error: "userIds doit être un tableau" });
    }

    const results = [];
    for (const uid of userIds) {
      const tache = await service.addCollaborateur(tacheId, uid);
      results.push(tache);
    }

    return res.json({
      message: ErreurMessages.COLLABADDED,
      results
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}


    static async uploadImage(req: Request, res: Response) {
    try {
        const tacheId = Number(req.params.id);
        const imageUrl = `/uploads/${req.file?.filename}`;

        const tache = await service.update(tacheId, {
            imageUrl: imageUrl
        });

        res.json({
            message: ErreurMessages.IMAGEUPLOADED,
            tache
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
}
