import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateAffiliatedBoxInput, CreateAffiliatedBoxOutput } from "./dtos/create-box.dto";
import { DeleteAffiliatedBoxOutput } from "./dtos/delete-box.dto";
import { MyAffiliatedBoxUsersOutput } from "./dtos/my-affiliated-box-users.dto";
import { AffiliatedBox } from "./entities/box.entity";


@Injectable()
export class AffiliatedBoxService {
    constructor(
        @InjectRepository(AffiliatedBox)
        private readonly box:Repository<AffiliatedBox>,
        @InjectRepository(User)         
        private readonly users: Repository<User>,
    ) {}

    async createAffiliatedBox(
        owner: User,
        createAffiliatedBoxInput: CreateAffiliatedBoxInput): Promise<CreateAffiliatedBoxOutput> {
        try {
            const newBox = this.box.create(createAffiliatedBoxInput);
            const user = await this.users.findOne(owner.id);
            user.affiliatedBox = newBox;

            await this.box.save(newBox);
            await this.users.save(user);
            return {
                ok:true,
                affiliatedBoxId: newBox.id,
            }
        } catch {
            return {
                ok: false,
                error: "Could not create Box.",
            };
        }
    }

    async deleteAffiliatedBox( user:User ):Promise<DeleteAffiliatedBoxOutput> {
        try {
            const affiliatedBox = await this.box.findOne(user.affiliatedBoxId);
            if(!affiliatedBox) {
                return {
                    ok:false,
                    error: "Affiliated Box not found.",
                }
            }
            await this.box.delete(affiliatedBox.id);
            return {
                ok:true,
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async myAffiliatedBoxUsers( user:User ):Promise<MyAffiliatedBoxUsersOutput> {
        try {
            const affiliatedBox = await this.box.findOne(user.affiliatedBoxId);
            const users = await this.users.find({affiliatedBox});
            
            return {
                users: users,
                ok:true,
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }
}