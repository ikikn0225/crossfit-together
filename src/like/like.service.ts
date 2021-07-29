import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bor } from "src/board-of-record/entities/board-of-record.entity";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { Notice } from "src/notice/entities/notice.entity";
import { User } from "src/user/entities/user.entity";
import { Wod } from "src/wod/entities/wod.entity";
import { Repository } from "typeorm";
import { CreateLikeInWodInput, CreateLikeInWodOutput } from "./dtos/create-like-in-wod.dto";
import { DeleteLikeInWodInput, DeleteLikeInWodOutput } from "./dtos/delete-like-in-wod.dto";
import { AllLikesInWodInput, AllLikesInWodOutput } from "./dtos/likes-in-wod.dto";
import { Like } from "./entities/like.entity";



@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like)
            private readonly likes:Repository<Like>,
        @InjectRepository(Wod)
            private readonly wods:Repository<Wod>,
    ) {}

    async createLikeInWod(
        authUser:User,
        createLikeInWodInput:CreateLikeInWodInput
    ):Promise<CreateLikeInWodOutput> {
        try {
            const wod = await this.wods.findOne(createLikeInWodInput.wodId);
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

    async deleteLikeInWod(
        authUser:User,
        deleteLikeInWod:DeleteLikeInWodInput
    ):Promise<DeleteLikeInWodOutput> {
        try {
            const wod = await this.wods.findOne(deleteLikeInWod.wodId);
            if(!wod) {
                return {
                    ok:false,
                    error:"Wod not found."
                }
            }
            const like = await this.likes.findOne({id:deleteLikeInWod.id, wod, owner:authUser});
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
            await this.likes.delete(deleteLikeInWod.id);
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

    async allLikesInWod(
        allLikesInWodInput:AllLikesInWodInput
    ):Promise<AllLikesInWodOutput> {
        try {
            const wod = await this.wods.findOne(allLikesInWodInput.wodId);
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