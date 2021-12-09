import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Wod } from "src/wod/entities/wod.entity";
import { Repository } from "typeorm";
import { CreateBorInput, CreateBorOutput } from "./dtos/create-record.dto";
import { DeleteBorInput, DeleteBorOutput } from "./dtos/delete-record.dto";
import { EditBorInput, EditBorOutput } from "./dtos/edit-record.dto";
import { AllBoardofRecordInput, AllBoardofRecordOutput } from "./dtos/all-board-of-records.dto";
import { Bor } from "./entities/board-of-record.entity";
import { MyBoardofRecordInput, MyBoardofRecordOutput } from "./dtos/my-board-of-records.dto";
import { AllMyBoardofRecordOutput } from "./dtos/all-my-board-of-records.dto";


@Injectable()
export class BorService {
    constructor(
        @InjectRepository(Bor)
            private readonly bors:Repository<Bor>,
        @InjectRepository(Wod)
            private readonly wods:Repository<Wod>
    ) {}

    async createBor(
        owner:User,
        createBorInput:CreateBorInput
    ):Promise<CreateBorOutput> {
        try {
            const wod = await this.wods.findOne( createBorInput.wodId );
            // createBorInput.ownerId = owner.id;
            if(!wod) {
                return {
                    ok:false,
                    error:"Wod not found."
                }
            }
            const newBor = await this.bors.save(this.bors.create({...createBorInput, wod, owner}));
            
            return {
                ok:true,
                borId:newBor.id
            }
        } catch (error) {
            return {
                ok:true,
                error
            }
        }
    }

    async editBor(
        owner:User,
        editBorInput:EditBorInput
    ):Promise<EditBorOutput> {
        try {
            const bor = await this.bors.findOne(editBorInput.borId);
            if(!bor) {
                return {
                    ok:false,
                    error:"Board of Record not found.",
                }
            }
            if(bor.ownerId !== owner.id) {
                return {
                    ok:false,
                    error:"You cannot do that.",
                }
            }
            await this.bors.save([{
                id:editBorInput.borId,
                ...editBorInput
            }]);
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

    async deleteBor(
        owner:User,
        {id}:DeleteBorInput
    ):Promise<DeleteBorOutput> {
        try {
            const bor = await this.bors.findOne(id);
            if(!bor) {
                return {
                    ok:true,
                    error:"Board of Record not found."
                }
            }
            if(bor.ownerId !== owner.id) {
                return {
                    ok:true,
                    error:"You cannot do that."
                }
            }
            await this.bors.delete(bor.id);
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

    async allBoardofRecords(
        {id}:AllBoardofRecordInput
    ):Promise<AllBoardofRecordOutput> {
        try {
            const wod = await this.wods.findOne({id});
            const bors = await this.bors.find({where:{wod}, relations: ['owner'], order:{createdAt:"DESC"}});
            if(!wod) {
                return {
                    ok:false,
                    error:"Wod not found."
                }
            }
            return {
                bors,
                ok:true,
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async myBoardofRecords(
        authUser:User,
        {id}:MyBoardofRecordInput
    ):Promise<MyBoardofRecordOutput> {
        try {
            const wod = await this.wods.findOne({id});
            const bors = await this.bors.find({where:{wod, owner:authUser}, relations: ['owner', 'wod'], order:{createdAt:"DESC"}});
            
            if(!wod) {
                return {
                    ok:false,
                    error:"Wod not found."
                }
            }
            return {
                ok:true,
                bors
            }
            
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async allMyBoardofRecords(
        owner:User
    ):Promise<AllMyBoardofRecordOutput> {
        try {
            const bors = await this.bors.find({owner});
            
            return {
                ok:true,
                bors
            }
            
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }
}