import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { AllDistinctHoldsInput, AllDistinctHoldsOutput } from "./dtos/all-distinct-holds.dto";
import { AllHoldsInput, AllHoldsOutput } from "./dtos/all-holds.dto";
import { AllSpecificHoldsInput, AllSpecificHoldsOutput } from "./dtos/all-specific-holds.dto";
import { DeleteHoldInput, DeleteHoldOutput } from "./dtos/delete-hold.dto";
import { HoldListOutput } from "./dtos/hold-list.dto";
import { MyHoldsOutput } from "./dtos/my-holds.dto";
import { RegisterHoldInput } from "./dtos/register-hold.dto";
import { Hold } from "./entities/hold.entity";


@Injectable()
export class HoldService {
    constructor(
        @InjectRepository(Hold)
            private readonly holds:Repository<Hold>,
        @InjectRepository(User)
            private readonly users:Repository<User>,
        @InjectRepository(AffiliatedBox)
            private readonly affiliatedBoxes:Repository<AffiliatedBox>,
    ){}

    async registerHold(
        authUser:User,
        registerHoldInput:RegisterHoldInput
    ) {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne( authUser.affiliatedBoxId );
            const hold = await this.holds.find({owner:authUser});
            if(hold.length >= 15) {
                return {
                    ok:true,
                    error:"There are no available holds.",
                }
            }
            const newHold = await this.holds.save(this.holds.create({holdAt:registerHoldInput.holdAt, owner:authUser, affiliatedBox}));

            return {
                ok: true,
                holdId:newHold.id
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async allDistinctHolds(
        authUser:User,
        {affiliatedBoxId}:AllDistinctHoldsInput
    ):Promise<AllDistinctHoldsOutput> {
        try {
            const holds = await this.holds.find({relations: ['owner'], where: {affiliatedBoxId}, });
            holds.sort(function (a, b) {
                return b.holdAt.getTime() - a.holdAt.getTime();
            });
            
            let helpArray = new Array(); 
            let holdDistinctArray = new Array(); 

            // // holdAt 중복x 개수 뽑아내기
            holds.forEach(hold => {
                if(helpArray.indexOf(hold.holdAt.toISOString()) == -1) {
                    holdDistinctArray.push(hold);
                    helpArray.push(hold.holdAt.toISOString());
                }
            });
            
            
            if(!holds) {
                return {
                    ok:false,
                    error:"Holds not found."
                }
            }
            return {
                ok:true,
                holds:holdDistinctArray
            }
            
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async distinctHoldList(
        authUser:User,
        first?:number,
        after?:number,
    ):Promise<HoldListOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne(authUser.affiliatedBoxId);
            if(!affiliatedBox) {
                return {
                    ok:false,
                    error:"Affiliated Box not found."
                }
            }
            const holds = await this.holds.find({relations: ['owner'], where:{affiliatedBox}, });
            holds.sort(function (a, b) {
                return b.holdAt.getTime() - a.holdAt.getTime();
            });
            
            let helpArray = new Array(); 
            let holdDistinctArray = new Array(); 

            // // holdAt 중복x 개수 뽑아내기
            holds.forEach(hold => {
                if(helpArray.indexOf(hold.holdAt.toISOString()) == -1) {
                    holdDistinctArray.push(hold);
                    helpArray.push(hold.holdAt.toISOString());
                }
            });

            if(!holdDistinctArray.length) return { ok:true, edges:[] }
            
            const firstHold = first || 10;
            const afterHold = after || 0;
            const index = holdDistinctArray.findIndex((hold) => hold.id === afterHold);
            const offset = index + 1;

            const holdListResult = holdDistinctArray.slice(offset, offset + firstHold);
            const lastHoldListResult = holdListResult[holdListResult.length - 1];

            return {
                ok:true,
                pageInfo: {
                    endCursor: lastHoldListResult.id,
                    hasNextPage: offset + firstHold < holdDistinctArray.length,
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

    async allSpecificHolds(
        authUser:User,
        {holdAt}:AllSpecificHoldsInput
    ):Promise<AllSpecificHoldsOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne( authUser.affiliatedBoxId );
            const holds = await this.holds.find({relations: ['owner'], where:{holdAt} });
            
            if(!holds) {
                return {
                    ok:false,
                    error:"Holds not found."
                }
            }
            return {
                ok:true,
                holds
            }
            
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async allHolds(
        authUser:User,
        {affiliatedBoxId}:AllHoldsInput
    ):Promise<AllHoldsOutput> {
        try {
            const holds = await this.holds.find({relations: ['owner'], where:{affiliatedBoxId} });
            
            if(!holds) {
                return {
                    ok:false,
                    error:"Holds not found."
                }
            }
            return {
                ok:true,
                holds
            }
            
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async myHolds(
        owner:User
    ):Promise<MyHoldsOutput> {
        try {
            const holds = await this.holds.find({owner});
            holds.sort(function (a, b) {
                return b.holdAt.getTime() - a.holdAt.getTime();
            });
            if(!holds) {
                return {
                    ok:false,
                    error:"Hold not found."
                }
            }
            return {
                ok:true,
                holds
            }
            
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async deleteHold(
        authUser:User,
        {id}:DeleteHoldInput
    ):Promise<DeleteHoldOutput> {
        try {
            const hold = await this.holds.findOne({id}, {relations:["owner"]});
            
            if(!hold) {
                return {
                    ok:false,
                    error:"Hold not found."
                }
            }
            if(authUser.id !== hold.ownerId) {
                return {
                    ok:false,
                    error:"You cannot do this."
                }
            }
            await this.holds.delete(id);
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