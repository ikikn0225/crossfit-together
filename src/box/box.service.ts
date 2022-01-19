import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { AddTimeTableInput, AddTimeTableOutput } from "./dtos/add-time-table.dto";
import { AllAffiliatedBoxesOutput } from "./dtos/all-affiliated-boxes.dto";
import { CreateAffiliatedBoxInput, CreateAffiliatedBoxOutput } from "./dtos/create-box.dto";
import { DeleteAffiliatedBoxOutput } from "./dtos/delete-box.dto";
import { MyAffiliatedBoxUsersOutput } from "./dtos/my-affiliated-box-users.dto";
import { MyAffiliatedBoxOutput } from "./dtos/my-affiliated-box.dto";
import { AffiliatedBox } from "./entities/box.entity";


@Injectable()
export class AffiliatedBoxService {
    constructor(
        @InjectRepository(AffiliatedBox)
        private readonly box:Repository<AffiliatedBox>,
        @InjectRepository(User)         
        private readonly users: Repository<User>,
    ) {}

    async createAffiliatedBox(
        owner: User,
        createAffiliatedBoxInput: CreateAffiliatedBoxInput): Promise<CreateAffiliatedBoxOutput> {
        try {
            const existBox = await this.box.findOne({name:createAffiliatedBoxInput.name});
            if(existBox) return {ok:false, error:'There is an existed Box'};

            const newBox = this.box.create(createAffiliatedBoxInput);
            const user = await this.users.findOne(owner.id);
            user.affiliatedBox = newBox;

            await this.box.save(newBox);
            await this.users.save(user);
            return {
                ok:true,
                affiliatedBoxId: newBox.id,
            }
        } catch {
            return {
                ok: false,
                error: "Could not create Box.",
            };
        }
    }

    async deleteAffiliatedBox( user:User ):Promise<DeleteAffiliatedBoxOutput> {
        try {
            const affiliatedBox = await this.box.findOne(user.affiliatedBoxId);
            if(!affiliatedBox) {
                return {
                    ok:false,
                    error: "Affiliated Box not found.",
                }
            }
            await this.box.delete(affiliatedBox.id);
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

    async allAffiliatedBoxes():Promise<AllAffiliatedBoxesOutput> {
        try {
            const allAffiliatedBoxes = await this.box.find();
            return {
                allAffiliatedBoxes: allAffiliatedBoxes,
                ok:true,
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async myAffiliatedBox( user:User ):Promise<MyAffiliatedBoxOutput> {
        try {
            const affiliatedBox = await this.box.findOne(user.affiliatedBoxId);
            if(!affiliatedBox) {
                return {
                    ok:false,
                    error:"There is no Box"
                }
            }
            return {
                ok:true,
                affiliatedBox:affiliatedBox
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async myAffiliatedBoxUsers( user:User ):Promise<MyAffiliatedBoxUsersOutput> {
        try {
            const affiliatedBox = await this.box.findOne(user.affiliatedBoxId);
            const users = await this.users.find({affiliatedBox});
            
            return {
                users: users,
                ok:true,
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async addTimeTable(
        user: User,
        {timeTableImg}: AddTimeTableInput 
    ): Promise<AddTimeTableOutput> {
        try {
            const affiliatedBox = await this.box.findOne(user.affiliatedBoxId);

            const edittimeTable = await this.box.save([{
                id:user.affiliatedBoxId,
                timeTableImg,
                ...affiliatedBox
            }]);
            if(affiliatedBox) affiliatedBox.timeTableImg = timeTableImg;
            await this.box.save(affiliatedBox);

            
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
}