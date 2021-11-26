import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { AllFreeTrialOutput } from "./dtos/all-free-trial.dto";
import { AllSpecificFreeTrialsInput, AllSpecificFreeTrialsOutput } from "./dtos/all-specific-free-trials.dto";
import { RegisterFreeTrialInput, RegisterFreeTrialOutput } from "./dtos/register-free-trial.dto";
import { DeleteFreeTrialInput, DeleteFreeTrialOutput } from "./dtos/delete-free-trial.dto";
import { FreeTrialListOutput } from "./dtos/free-trial-list.dto";
import { FreeTrial } from "./entities/ft.entity";
import { MyFreeTrialInput, MyFreeTrialOutput } from "./dtos/my-free-trial.dto";


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

    async registerFreeTrial(
        authUser:User,
        {freeTrialAt}:RegisterFreeTrialInput
    ):Promise<RegisterFreeTrialOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne( authUser.affiliatedBoxId );
            const freeTrial = await this.freeTrials.findOne({owner:authUser});
            
            // if(freeTrial) {
            //     return {
            //         ok:false,
            //         error:"You have no more opportunity."
            //     }
            // }
            const newFreeTrial = await this.freeTrials.save(this.freeTrials.create({freeTrialAt, owner:authUser, affiliatedBox}));

            return {
                ok: true,
                freeTrialId:newFreeTrial.id
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

    async distinctFreeTrialList(
        authUser:User,
        first?:number,
        after?:number,
    ):Promise<FreeTrialListOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne(authUser.affiliatedBoxId);
            if(!affiliatedBox) {
                return {
                    ok:false,
                    error:"Affiliated Box not found."
                }
            }
            const freeTrials = await this.freeTrials.find({relations: ['owner'], where:{affiliatedBox}, });
            freeTrials.sort(function (a, b) {
                return b.freeTrialAt.getTime() - a.freeTrialAt.getTime();
            });
            
            let helpArray = new Array(); 
            let freeTrialDistinctArray = new Array(); 

            // // holdAt 중복x 개수 뽑아내기
            freeTrials.forEach(freeTrial => {
                if(helpArray.indexOf(freeTrial.freeTrialAt.toISOString()) == -1) {
                    freeTrialDistinctArray.push(freeTrial);
                    helpArray.push(freeTrial.freeTrialAt.toISOString());
                }
            });

            if(!freeTrialDistinctArray.length) return { ok:true, edges:[] }
            
            const firstHold = first || 10;
            const afterHold = after || 0;
            const index = freeTrialDistinctArray.findIndex((hold) => hold.id === afterHold);
            const offset = index + 1;

            const holdListResult = freeTrialDistinctArray.slice(offset, offset + firstHold);
            const lastHoldListResult = holdListResult[holdListResult.length - 1];

            return {
                ok:true,
                pageInfo: {
                    endCursor: lastHoldListResult.id,
                    hasNextPage: offset + firstHold < freeTrialDistinctArray.length,
                },
                edges: holdListResult.map((hold) => ({
                    cursor: hold.id,
                    node: hold,
                }))
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async allSpecificFreeTrials(
        authUser:User,
        {freeTrialAt}:AllSpecificFreeTrialsInput
    ):Promise<AllSpecificFreeTrialsOutput> {
        try {
            const freeTrials = await this.freeTrials.find({relations: ['owner'], where:{freeTrialAt} });
            if(!freeTrials) {
                return {
                    ok:false,
                    error:"Holds not found."
                }
            }
            return {
                ok:true,
                freeTrials
            }
            
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async myFreeTrial(
        owner:User,
        {affiliatedBoxId}:MyFreeTrialInput
    ):Promise<MyFreeTrialOutput> {
        try {
            const freeTrial = await this.freeTrials.findOne({owner});

            if(!freeTrial || freeTrial == undefined) {
                return {
                    ok:false,
                    error:"Hold not found."
                }
            }
            
            return {
                ok:true,
                freeTrial
            }
            
        } catch (error) {
            return {
                ok:false,
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