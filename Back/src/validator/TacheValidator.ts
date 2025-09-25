import { z } from "zod";
import { ErreurMessages } from "../utils/errorsMessage.js";

export const CreateTacheSchema = z.object({
    titre: z.string().min(1, ErreurMessages.missingTacheNom),
    description: z.string().min(1, ErreurMessages.missingTachePrenom), 
    
});

export const UpdateTacheShema = CreateTacheSchema.partial();
