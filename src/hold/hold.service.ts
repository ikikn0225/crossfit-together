import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { AllHoldsInput, AllHoldsOutput } from "./dtos/all-holds.dto";
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
                    error:"There are no available holds.",
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

    async allDistinctHolds(
        authUser:User
    ):Promise<AllHoldsOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne( authUser.affiliatedBoxId );
            const holds = await this.holds.find({relations: ['owner'], where: {affiliatedBox}, });
            holds.sort(function (a, b) {
                return a.holdAt.getTime() - b.holdAt.getTime();
            });
            // console.log(holds);
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

    async allHolds(
        authUser:User,
        allHoldsInput:AllHoldsInput
    ):Promise<AllHoldsOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne( authUser.affiliatedBoxId );
            const holds = await this.holds.find({relations: ['owner'], where:{holdAt:allHoldsInput.holdAt} });
console.log(allHoldsInput.holdAt);

            // console.log(holds);
            // let holdDistinctArray = new Array(); 

            // // holdAt 중복x 개수 뽑아내기
            // holds.forEach(hold => {
            //     if(holdDistinctArray.indexOf(hold.holdAt.toISOString()) == -1) {
            //         holdDistinctArray.push(hold.holdAt.toISOString());
            //     }
            // });

            // //holdAt 같은 것들만 묶기
            // let sameHoldAtArray = new Array(holdDistinctArray.length).fill(null).map(()=>Array()); 
            // holdDistinctArray.forEach(function(element0, index) {
            //     holds.forEach(element1 => {
            //         if(element0 == element1.holdAt.toISOString()) {
            //             sameHoldAtArray[index].push(element1);
            //         }
            //     });
            // })
            // console.log(sameHoldAtArray);
            
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