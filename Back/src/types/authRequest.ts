import { Tache, User } from "@prisma/client";

export interface TacheWithCollaborateurs extends Tache {
    collaborateurs: User[];
}