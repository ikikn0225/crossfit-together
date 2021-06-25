import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateAffiliatedBoxInput, CreateAffiliatedBoxOutput } from "./dtos/create-box.dto";
import { AffiliatedBox } from "./entities/box.entity";


@Injectable()
export class AffiliatedBoxService {
    constructor(
        @InjectRepository(AffiliatedBox)
        private readonly box:Repository<AffiliatedBox>,
    ) {}

    async createAffiliatedBox(
        owner: User,
        createAffiliatedBoxInput: CreateAffiliatedBoxInput): Promise<CreateAffiliatedBoxOutput> {
        try {
            const newBox = this.box.create(createAffiliatedBoxInput)
            newBox.users.push(owner);
console.log(newBox.users);

            await this.box.save(newBox);
            return {
                ok:true,
                affiliatedBoxId: newBox.id,
            }
        } catch {
            return {
                ok: false,
                error: "Could not create restaurant.",
            };
        }
    }
}