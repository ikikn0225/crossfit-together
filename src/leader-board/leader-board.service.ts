import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { AllNamedWodRecordsInput, AllNamedWodRecordsOutput } from "./dtos/all-named-wod-records.dto";
import { AllOneRmRecordsInput, AllOneRmRecordsOutput } from "./dtos/all-one-rm-records.dto";
import { CreateNamedWodRecordInput, CreateNamedWodRecordOutput } from "./dtos/create-named-wod-record.dto";
import { CreateOneRmRecordInput, CreateOneRmRecordOutput } from "./dtos/create-one-rm-record.dto";
import { DeleteNamedWodInput, DeleteNamedWodOutput } from "./dtos/delete-named-wod.dto";
import { DeleteOneRmInput, DeleteOneRmOutput } from "./dtos/delete-one-rm.dto";
import { EditNamedWodRecordInput, EditNamedWodRecordOutput } from "./dtos/edit-named-wod.dto";
import { EditOneRmRecordInput, EditOneRmRecordOutput } from "./dtos/edit-one-rm.dto";
import { MyNamedWodRecordsInput, MyNamedWodRecordsOutput } from "./dtos/my-named-wod-records.dto";
import { MyOneRmRecordsInput, MyOneRmRecordsOutput } from "./dtos/my-one-rm-records.dto";
import { LeaderBoardNamedWod } from "./entities/lb-named-wods.entity";
import { LeaderBoardOneRm } from "./entities/lb-one-rm.entity";


@Injectable()
export class LeaderBoardService {
    constructor(
        @InjectRepository(LeaderBoardOneRm)
            private readonly lbOneRm:Repository<LeaderBoardOneRm>,
        @InjectRepository(LeaderBoardNamedWod)
            private readonly lbNamedWod:Repository<LeaderBoardNamedWod>,
        @InjectRepository(AffiliatedBox)
            private readonly affiliatedBoxes:Repository<AffiliatedBox>,
    ) {}

    async createOneRmRecord(
        owner:User,
        createOneRmInput:CreateOneRmRecordInput
    ):Promise<CreateOneRmRecordOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne( owner.affiliatedBoxId );
            if(!affiliatedBox) {
                return {
                    ok:false,
                    error:"Affiliated Box not found."
                }
            }
            await this.lbOneRm.save(this.lbOneRm.create({...createOneRmInput, affiliatedBox, owner}));
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

    async editOneRmRecord(
        owner:User,
        editOneRmInput:EditOneRmRecordInput
    ):Promise<EditOneRmRecordOutput> {
        try {
            const oneRm = await this.lbOneRm.findOne(editOneRmInput.oneRmId);
            if(owner.id !== oneRm.ownerId) {
                return {
                    ok:false,
                    error:"You cannot do this."
                }
            }
            await this.lbOneRm.save([{
                id:editOneRmInput.oneRmId,
                ...editOneRmInput
            }]);
            return {
                ok:true
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async deleteOneRmRecord(
        owner:User,
        {oneRmId}:DeleteOneRmInput
    ):Promise<DeleteOneRmOutput> {
        try {
            const oneRm = await this.lbOneRm.findOne(oneRmId);
            if(!oneRm) {
                return {
                    ok:false,
                    error:"oneRm not found."
                }
            }
            if(owner.id !== oneRm.ownerId) {
                return {
                    ok:false,
                    error:"You cannot do this."
                }
            }
            await this.lbOneRm.delete(oneRmId);
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

    async allOneRmRecords(
        authUser:User,
        { oneRm }: AllOneRmRecordsInput
    ):Promise<AllOneRmRecordsOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne( authUser.affiliatedBoxId );
            const oneRms = await this.lbOneRm.find({where:{oneRm, affiliatedBox}, relations:['owner'], order:{record:"DESC"}});
            
            if(!affiliatedBox) {
                return {
                    ok:false,
                    error:"Affiliated Box not found."
                }
            }

            if(!oneRms) {
                return {
                    ok:false,
                    error:"oneRm not found."
                }
            }
            return {
                ok:true,
                lbOneRms:oneRms,
            }
            
        } catch (error) {
            return {
                ok:true,
                error
            }
        }
    }

    async myOneRmRecords(
        authUser:User,
        { oneRm }: MyOneRmRecordsInput
    ):Promise<MyOneRmRecordsOutput> {
        try {
            const oneRms = await this.lbOneRm.find({oneRm, owner:authUser});
            return {
                ok:true,
                lbOneRms:oneRms,
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async createNamedWodRecord(
        owner:User,
        createNamedWodInput:CreateNamedWodRecordInput
    ):Promise<CreateNamedWodRecordOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne( owner.affiliatedBoxId );
            if(!affiliatedBox) {
                return {
                    ok:false,
                    error:"Affiliated Box not found."
                }
            }
            await this.lbNamedWod.save(this.lbNamedWod.create({...createNamedWodInput, affiliatedBox, owner}));
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

    async editNamedWodRecord(
        owner:User,
        editNamedWodInput:EditNamedWodRecordInput
    ):Promise<EditNamedWodRecordOutput> {
        try {
            const namedWod = await this.lbNamedWod.findOne(editNamedWodInput.namedWodId);
            if(owner.id !== namedWod.ownerId) {
                return {
                    ok:false,
                    error:"You cannot do this."
                }
            }
            await this.lbNamedWod.save([{
                id:editNamedWodInput.namedWodId,
                ...editNamedWodInput
            }]);
            return {
                ok:true
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async deleteNamedWodRecord(
        owner:User,
        {namedWodId}:DeleteNamedWodInput
    ):Promise<DeleteNamedWodOutput> {
        try {
            const namedWod = await this.lbNamedWod.findOne(namedWodId);
            if(!namedWod) {
                return {
                    ok:false,
                    error:"namedWod not found."
                }
            }
            if(owner.id !== namedWod.ownerId) {
                return {
                    ok:false,
                    error:"You cannot do this."
                }
            }
            await this.lbNamedWod.delete(namedWodId);
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

    async allNamedWodRecords(
        authUser:User,
        { namedWod }: AllNamedWodRecordsInput
    ):Promise<AllNamedWodRecordsOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne( authUser.affiliatedBoxId );
            const namedWods = await this.lbNamedWod.find({where:{namedWod, affiliatedBox}, relations:['owner'], order:{record:"DESC"}});
            if(!affiliatedBox) {
                return {
                    ok:false,
                    error:"Affiliated Box not found."
                }
            }
            if(!namedWods) {
                return {
                    ok:false,
                    error:"namedWods not found."
                }
            }
            return {
                ok:true,
                lbNamedWods:namedWods,
            }
            
        } catch (error) {
            return {
                ok:true,
                error
            }
        }
    }

    async myNamedWodRecords(
        authUser:User,
        { namedWod }: MyNamedWodRecordsInput
    ):Promise<MyNamedWodRecordsOutput> {
        try {
            const NamedWods = await this.lbNamedWod.find({namedWod, owner:authUser});
            return {
                ok:true,
                lbNamedWods:NamedWods,
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }
}