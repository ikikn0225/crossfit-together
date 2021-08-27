import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bor } from "src/board-of-record/entities/board-of-record.entity";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { AllWodsOutput } from "./dtos/all-wods.dto";
import { CreateWodInput, CreateWodOutput } from "./dtos/create-wod.dto";
import { DeleteWodInput, DeleteWodOutput } from "./dtos/delete-wod.dto";
import { EditWodInput, EditWodOutput } from "./dtos/edit-wod.dto";
import { Wod } from "./entities/wod.entity";



@Injectable()
export class WodService {
    constructor(
        @InjectRepository(Wod)
            private readonly wods:Repository<Wod>,
        @InjectRepository(AffiliatedBox)
            private readonly affiliatedBoxes:Repository<AffiliatedBox>,
        @InjectRepository(Bor)
            private readonly bors:Repository<Bor>,
    ) {}

    async createWod(
        owner:User,
        createWodInput:CreateWodInput
    ):Promise<CreateWodOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne( owner.affiliatedBoxId );
            if(!affiliatedBox) {
                return {
                    ok:false,
                    error:"Affiliated Box not found."
                }
            }
            await this.wods.save( this.wods.create({...createWodInput, affiliatedBox}) );
            return {
                ok:true,
            }
        } catch (error) {
            return {
                ok:true,
                error
            }
        }
    }

    async editWod(
        owner:User,
        editWodInput:EditWodInput
    ):Promise<EditWodOutput> {
        try {
            const wod = await this.wods.findOne(editWodInput.wodId, { relations:['affiliatedBox'] });

            if(!wod) {
                return {
                    ok:false,
                    error:"Wod not found."
                }
            }
            if(wod.affiliatedBox.id !== owner.affiliatedBoxId) {
                return {
                    ok:false,
                    error:"You cannot do that."
                }
            }
            await this.wods.save([{
                id:editWodInput.wodId,
                ...editWodInput
            }]);
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

    async deleteWod(
        owner:User,
        {wodId}:DeleteWodInput
    ):Promise<DeleteWodOutput> {
        try {
            const wod = await this.wods.findOne(wodId, {relations:["affiliatedBox"]});
            if(!wod) {
                return {
                    ok:false,
                    error:"Wod not found."
                }
            }
            if(wod.affiliatedBox.id !== owner.affiliatedBoxId) {
                return {
                    ok:false,
                    error:"You cannot do that."
                }
            }
            await this.wods.delete(wodId);
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

    async allWods(
        authUser:User
    ):Promise<AllWodsOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne(authUser.affiliatedBoxId);
            if(!affiliatedBox) {
                return {
                    ok:false,
                    error:"Affiliated Box not found."
                }
            }
            const wods = await this.wods.find({relations:["likes"], where: {affiliatedBox}});
            if(!wods) {
                return {
                    ok:false,
                    error:"Wod not found."
                }
            }
            return {
                ok:true,
                wods
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }
}