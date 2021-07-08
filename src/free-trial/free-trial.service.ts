import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { AllFreeTrialOutput } from "./dtos/all-free-trial.dto";
import { CreateFreeTrialInput, CreateFreeTrialOutput } from "./dtos/create-free-trial.dto";
import { DeleteFreeTrialInput, DeleteFreeTrialOutput } from "./dtos/delete-free-trial.dto";
import { FreeTrial } from "./entities/ft.entity";


@Injectable()
export class FreeTrialService {
    constructor(
        @InjectRepository(FreeTrial)
            private readonly freeTrials:Repository<FreeTrial>,
        @InjectRepository(User)
            private readonly users:Repository<User>,
        @InjectRepository(AffiliatedBox)
            private readonly affiliatedBoxes:Repository<AffiliatedBox>,
    ){}

    async createFreeTrial(
        authUser:User,
        createFreeTrialInput:CreateFreeTrialInput
    ):Promise<CreateFreeTrialOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne( authUser.affiliatedBoxId );
            const freeTrial = await this.freeTrials.findOne({owner:authUser});
            
            if(freeTrial) {
                return {
                    ok:false,
                    error:"You have no more opportunity."
                }
            }
            if(!createFreeTrialInput.workoutTime) {
                return {
                    ok:false,
                    error:"Please enter the workout time set.",
                }
            }
            await 
            await this.freeTrials.save(this.freeTrials.create({...createFreeTrialInput, owner:authUser, affiliatedBox}));
            return {
                ok: true,
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async allFreeTrial(
        authUser:User
    ):Promise<AllFreeTrialOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne( authUser.affiliatedBoxId );
            const freeTrials = await this.freeTrials.find({relations: ['owner'], where: {affiliatedBox}});

            if(!freeTrials) {
                return {
                    ok:false,
                    error:"Free Trial no found."
                }
            }
            return {
                ok:true,
                freeTrials
            }
            
        } catch (error) {
            return {
                ok:true,
                error
            }
        }
    }
    
    async deleteFreeTrial(
        authUser:User,
        {id}:DeleteFreeTrialInput
    ):Promise<DeleteFreeTrialOutput> {
        try {
            const freeTrial = await this.freeTrials.findOne({id}, {relations:["owner"]});
            
            if(!freeTrial) {
                return {
                    ok:false,
                    error:"Hold not found."
                }
            }
            if(authUser.id !== freeTrial.owner.id) {
                return {
                    ok:false,
                    error:"You cannot do this."
                }
            }
            await this.freeTrials.delete(id);
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