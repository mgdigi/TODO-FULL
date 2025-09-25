import  {Tache, ETAT} from "@prisma/client";
import { TacheRepository } from "../repositories/TacheRepository.js";


export class TacheService  {
    private repo: TacheRepository;

    constructor() {
        this.repo = new TacheRepository();
    }

     findAll(userId : number ,skip : number, limit : number, filter? : string ): Promise<Tache[]> {
        return this.repo.findAll(userId, skip, limit, filter);
    }

    async countAll(userId : number ,filter? : string): Promise<number> {
    return this.repo.countAll(userId, filter);
    }


     findById(id: number): Promise<Tache | null> {
        return this.repo.findById(id);
    }

    create(data: Omit<Tache, "id">): Promise<Tache> {

        return this.repo.create(data);
    }

    update(
        id: number,
        data: Partial<Omit<Tache, "id">>
    ): Promise<Tache> {
        return this.repo.update(id, data);
    }

    async delete(id: number): Promise<void> {
        await this.repo.delete(id);
    }

    async updateEtat(id : number , newEtat : ETAT): Promise<Tache> {
      return this.repo.updateEtat(id, newEtat);
    }

    async addCollaborateur(tacheid : number, collaborateurId : number):Promise<Tache>{
        return this.repo.addCollaborateur(tacheid, collaborateurId);
    }
   

}
