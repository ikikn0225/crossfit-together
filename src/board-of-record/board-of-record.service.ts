import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Wod } from "src/wod/entities/wod.entity";
import { Repository } from "typeorm";
import { CreateBorInput, CreateBorOutput } from "./dtos/create-record.dto";
import { DeleteBorInput, DeleteBorOutput } from "./dtos/delete-record.dto";
import { EditBorInput, EditBorOutput } from "./dtos/edit-record.dto";
import { RecordListInput, RecordListOutput } from "./dtos/record-list.dto";
import { Bor } from "./entities/board-of-record.entity";


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
            createBorInput.ownerId = owner.id;
            if(!wod) {
                return {
                    ok:false,
                    error:"Wod not found."
                }
            }
            await this.bors.save(this.bors.create({...createBorInput, wod, owner}));
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

    async recordList(
        {id}:RecordListInput
    ):Promise<RecordListOutput> {
        try {
            const wod = await this.wods.findOne({id});
            const bors = await this.bors.find({wod});
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
}