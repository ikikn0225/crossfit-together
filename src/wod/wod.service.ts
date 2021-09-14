import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bor } from "src/board-of-record/entities/board-of-record.entity";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { AllCategoriesOutput } from "./dtos/all-categories.dto";
import { AllWodsInput, AllWodsOutput } from "./dtos/all-wods.dto";
import { CategoryInput, CategoryOutput } from "./dtos/category.dto";
import { CreateWodInput, CreateWodOutput } from "./dtos/create-wod.dto";
import { DeleteWodInput, DeleteWodOutput } from "./dtos/delete-wod.dto";
import { EditWodInput, EditWodOutput } from "./dtos/edit-wod.dto";
import { OneWodInput, OneWodOutput } from "./dtos/one-wod.dto";
import { Category } from "./entities/category.entity";
import { Wod } from "./entities/wod.entity";
import { CategoryRepository } from "./repositories/category.repository";



@Injectable()
export class WodService {
    constructor(
        @InjectRepository(Wod)
            private readonly wods:Repository<Wod>,
        @InjectRepository(AffiliatedBox)
            private readonly affiliatedBoxes:Repository<AffiliatedBox>,
        @InjectRepository(Bor)
            private readonly bors:Repository<Bor>,
        private readonly categories:CategoryRepository,
    ) {}

    async createWod(
        owner:User,
        createWodInput:CreateWodInput
    ):Promise<CreateWodOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne( owner.affiliatedBoxId );
            const category = await this.categories.findOne( createWodInput.categoryId );
            if(!affiliatedBox) {
                return {
                    ok:false,
                    error:"Affiliated Box not found."
                }
            }
            if(!category) {
                return {
                    ok:false,
                    error:"Category not found",
                }
            }
            await this.wods.save( this.wods.create({...createWodInput, affiliatedBox, category}) );
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
            const category = await this.categories.findOne( editWodInput.categoryId );

            if(!wod) {
                return {
                    ok:false,
                    error:"Wod not found."
                }
            }
            if(!category) {
                return {
                    ok:false,
                    error:"Category not found",
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
                category,
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
        authUser:User,
        {slug}:AllWodsInput
    ):Promise<AllWodsOutput> {
        try {
            const affiliatedBox = await this.affiliatedBoxes.findOne(authUser.affiliatedBoxId);
            if(!affiliatedBox) {
                return {
                    ok:false,
                    error:"Affiliated Box not found."
                }
            }
            let wods:Wod[];
            if(slug) {
                const category = await this.categories.findOne({slug},);
                wods = await this.wods.find({relations:["likes"], where: {affiliatedBox, category:category}, order:{title:"DESC"}});
            }
            else
                wods = await this.wods.find({relations:["likes"], where: {affiliatedBox}, order:{title:"DESC"}});
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

    async findWodById({wodId}: OneWodInput): Promise<OneWodOutput> {
        try {
            const wod = await this.wods.findOne(wodId
                , { relations: ['likes', 'category'], }
            );
            if(!wod) {
                return {
                    ok:false,
                    error:'Wod not found',
                };
            }
            return {
                ok: true,
                wod,
            };
        } catch (error) {
            return {
                ok: false,
                error:'Could not find wod',
            }
        }
    }

    // countWod(category:Category) {
    //     return this.wods.count({category});
    // }

    async allCategories(): Promise<AllCategoriesOutput> {
        try {
            const categories = await this.categories.find();
            return {
                ok: true,
                categories
            }
        } catch (error) {
            return {
                ok:false,
                error: "Could not load categories.",
            }
        }
    }

    async findCategoryBySlug({ slug }:CategoryInput): Promise<CategoryOutput> {
        try {
            const category = await this.categories.findOne({slug},);
            console.log(category);
            
            if(!category) {
                return {
                    ok:false,
                    error:'Category not found',
                };
            }
            const wods = await this.wods.find({
                where:{
                    category,
                }
            });
            console.log(wods);
            
            return {
                ok:true,
                category,
                wods
            }
        } catch (error) {
            return {
                ok: false,
                error: 'Could not load category',
            }
        }
    }
}