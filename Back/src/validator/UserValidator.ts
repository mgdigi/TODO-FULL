import { z } from "zod";
import { ErreurMessages } from "../utils/errorsMessage.js";

export const CreateUserSchema = z.object({
    nom: z.string().min(1, ErreurMessages.missingTacheNom),
    prenom: z.string().min(1, ErreurMessages.missingTachePrenom),
    login: z.string().email(),
    password: z.string().min(6),
        
});

export const UpdateUserShema = CreateUserSchema.partial();
