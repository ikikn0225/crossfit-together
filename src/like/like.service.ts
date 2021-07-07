import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bor } from "src/board-of-record/entities/board-of-record.entity";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { Notice } from "src/notice/entities/notice.entity";
import { User } from "src/user/entities/user.entity";
import { Wod } from "src/wod/entities/wod.entity";
import { Repository } from "typeorm";
import { CreateLikeOnWodInput, CreateLikeOnWodOutput } from "./dtos/create-like-on-wod.dto";
import { Like } from "./entities/like.entity";



@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like)
            private readonly likes:Repository<Like>,
        @InjectRepository(Wod)
            private readonly wods:Repository<Wod>,
    ) {}

    async createLikeOnWod(
        authUser:User,
        createLikeOnWodInput:CreateLikeOnWodInput
    ):Promise<CreateLikeOnWodOutput> {
        try {
            const wod = await this.wods.findOne(createLikeOnWodInput.wodId);
            if(!wod) {
                return {
                    ok:false,
                    error:"Wod not found."
                }
            }
            await this.likes.save( this.likes.create({owner:authUser, wod}) );
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

}