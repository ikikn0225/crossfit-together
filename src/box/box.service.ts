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
        @InjectRepository(User)         
        private readonly users: Repository<User>,
    ) {}

    async createAffiliatedBox(
        owner: User,
        createAffiliatedBoxInput: CreateAffiliatedBoxInput): Promise<CreateAffiliatedBoxOutput> {
        try {
            const newBox = this.box.create(createAffiliatedBoxInput);
            //유저에게 해당 박스의 id 값 담기
            const user = await this.users.findOne(owner.id);
            user.affiliatedBoxId = newBox.id;

            await this.box.save(newBox);
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
}