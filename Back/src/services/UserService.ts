import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { UserRepository } from "../repositories/UserRepository.js";
import { IRepository } from "../repositories/Irepository.js";



export class UserService  implements IRepository<User>{
    private repo : UserRepository;

    constructor () {
        this.repo = new UserRepository();
    }

     findAll() : Promise<User[]>{
        return this.repo.findAll();
    }

    findById(id: number): Promise<User | null> {
        return this.repo.findById(id);
    }
    create(data: Omit<User, "id">): Promise<User> {
        return this.repo.create(data);
    }

    update(id: number, data: User): Promise<User> {
        return this.repo.update(id, data);
    }
    delete(id: number): Promise<void> {
        return this.repo.delete(id);
    }

    async getByEmail(email : string ) {
        return this.repo.getByEmail(email);
    }

    async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }


}