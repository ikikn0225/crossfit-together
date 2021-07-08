import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bor } from "src/board-of-record/entities/board-of-record.entity";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { Notice } from "src/notice/entities/notice.entity";
import { User } from "src/user/entities/user.entity";
import { Wod } from "src/wod/entities/wod.entity";
import { Repository } from "typeorm";
import { CreateLikeOnWodInput, CreateLikeOnWodOutput } from "./dtos/create-like-on-wod.dto";
import { DeleteLikeOnWodInput, DeleteLikeOnWodOutput } from "./dtos/delete-like-on-wod.dto";
import { AllLikesOnWodInput, AllLikesOnWodOutput } from "./dtos/likes-on-wod.dto";
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

    async deleteLikeOnWod(
        authUser:User,
        deleteLikeOnWod:DeleteLikeOnWodInput
    ):Promise<DeleteLikeOnWodOutput> {
        try {
            const wod = await this.wods.findOne(deleteLikeOnWod.wodId);
            if(!wod) {
                return {
                    ok:false,
                    error:"Wod not found."
                }
            }
            const like = await this.likes.findOne({id:deleteLikeOnWod.id, wod, owner:authUser});
            if(!like) {
                return {
                    ok:false,
                    error:"Like not found."
                }
            }
            if(like.ownerId !== authUser.id) {
                return {
                    ok:false,
                    error:"You cannnot do that."
                }
            }
            await this.likes.delete(deleteLikeOnWod.id);
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

    async allLikesOnWod(
        allLikesOnWodInput:AllLikesOnWodInput
    ):Promise<AllLikesOnWodOutput> {
        try {
            const wod = await this.wods.findOne(allLikesOnWodInput.wodId);
            if(!wod) {
                return {
                    ok:false,
                    error:"Wod not found."
                }
            }
            const likes = await this.likes.find({relations: ['wod'], where: {wod}});
            return {
                ok:true,
                likes
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

}