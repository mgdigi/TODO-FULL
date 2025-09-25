import {PrismaClient, type Tache, ETAT} from "@prisma/client";
import { TacheWithCollaborateurs } from "../types/authRequest.js";


export class TacheRepository {
    private prisma : PrismaClient = new PrismaClient;

    async findAll(userId : number , skip: number, limit: number, filter?: string): Promise<Tache[]> {
  let where = {};

  if (filter === "ENCOURS") {
    where = { etat: ETAT.ENCOURS };
  } else if (filter === "TERMINEE") {
    where = { etat: ETAT.TERMINE };
  } else if (filter === "MINE") {
    where = { userId: userId }; 
  }

  return this.prisma.tache.findMany({
    skip,
    take: limit,
    where,
    include: { collaborateurs: true, user: true },
  });
}

async countAll(userId : number , filter?: string): Promise<number> {
  let where = {};

  if (filter === "ENCOURS") {
    where = { etat: ETAT.ENCOURS  };
  } else if (filter === "TERMINEE") {
    where = { etat: ETAT.TERMINE };
  } else if (filter === "MINE") {
    where = { userId: userId}; 
  }

  return this.prisma.tache.count({ where });
}



    async findById(id: number): Promise<TacheWithCollaborateurs | null> {
        return this.prisma.tache.findUnique({
            where: { id },
            include: {collaborateurs : true}
        });
    }

    async create(data: Omit<Tache, "id">): Promise<Tache> {
        return this.prisma.tache.create({ data });
    }

    async update(
        id: number,
        data: Partial<Omit<Tache, "id" >>
    ): Promise<Tache> {
        return this.prisma.tache.update({ where: { id }, data , include : {user : true} });
    }

    async delete(id: number): Promise<void> {
            this.prisma.tache.delete({ where: { id } })
    }

    async updateEtat(id : number, newEtat: ETAT ): Promise<Tache> {
         return this.prisma.tache.update({ 
            where: { id },
            data: {etat : newEtat}
        });
    }

    async addCollaborateur(tacheId: number, collaborateurId: number): Promise<TacheWithCollaborateurs> {
    return this.prisma.tache.update({
        where: { id: tacheId },
        data: {
            collaborateurs: {
                connect: { id: collaborateurId }
            }
        },
        include: { collaborateurs: true }
    });
}

}