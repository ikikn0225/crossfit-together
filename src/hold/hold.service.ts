import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { AllHoldsOutput } from "./dtos/all-holds.dto";
import { DeleteHoldInput, DeleteHoldOutput } from "./dtos/delete-hold.dto";
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
                    error:"You used all the available holds.",
                }
            }
            await this.holds.save(this.holds.create({holdAt:registerHoldInput.holdAt, owner:authUser, affiliatedBox}));
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

    async allHolds(
        authUser:User
    ):Promise<AllHoldsOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne( authUser.affiliatedBoxId );
            const holds = await this.holds.find({relations: ['owner'], where: {affiliatedBox}});
            holds.sort(function (a, b) {
                return a.holdAt.getTime() - b.holdAt.getTime();
            });
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
                return a.holdAt.getTime() - b.holdAt.getTime();
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