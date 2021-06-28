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
            //유저가 해당 박스의 id 값을 가지고 있는지 체크
            // newBox.users.push(owner);

            // await this.box.save(newBox);
            return {
                ok:true,
                affiliatedBoxId: 1,
            }
        } catch {
            return {
                ok: false,
                error: "Could not create Box.",
            };
        }
    }
}