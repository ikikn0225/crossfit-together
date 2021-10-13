import { Args, Mutation, Resolver, Query, ResolveField, Int, Parent } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { AllCategoriesOutput } from "./dtos/all-categories.dto";
import { AllWodsInput, AllWodsOutput } from "./dtos/all-wods.dto";
import { CategoryInput, CategoryOutput } from "./dtos/category.dto";
import { CreateWodInput, CreateWodOutput } from "./dtos/create-wod.dto";
import { DeleteWodInput, DeleteWodOutput } from "./dtos/delete-wod.dto";
import { EditWodInput, EditWodOutput } from "./dtos/edit-wod.dto";
import { OneWodInput, OneWodOutput } from "./dtos/one-wod.dto";
import { WodListInput, WodListOutput } from "./dtos/wod-list.dto";
import { Category } from "./entities/category.entity";
import { Wod } from "./entities/wod.entity";
import { WodService } from "./wod.service";


@Resolver(() => Wod)
export class WodResolver {
    constructor( private readonly wodService:WodService ){}

    @Role(["Coach"])
    @Mutation(type => CreateWodOutput)
    async createWod(
        @AuthUser() authUser:User,
        @Args('input') createWodInput:CreateWodInput
    ):Promise<CreateWodOutput> {
        return this.wodService.createWod(authUser, createWodInput);
    }

    @Role(["Coach"])
    @Mutation(type => EditWodOutput)
    async editWod(
        @AuthUser() authUser:User,
        @Args('input') editWodInput:EditWodInput
    ):Promise<EditWodOutput> {
        return this.wodService.editWod(authUser, editWodInput);
    }

    @Role(["Coach"])
    @Mutation(type => DeleteWodOutput)
    async deleteWod(
        @AuthUser() authUser:User,
        @Args('input') editWodInput:DeleteWodInput
    ):Promise<DeleteWodOutput> {
        return this.wodService.deleteWod(authUser, editWodInput);
    }

    @Role(["Any"])
    @Query(type => AllWodsOutput)
    async allWods(
        @AuthUser() authUser:User,
        @Args('input') allWodsInput:AllWodsInput
    ):Promise<AllWodsOutput> {
        return this.wodService.allWods(authUser, allWodsInput);
    }

    @Role(["Any"])
    @Query(type => WodListOutput)
    async wodList(
        @AuthUser() authUser:User,
        @Args('input') wodListInput:WodListInput
    ):Promise<WodListOutput> {
        return this.wodService.wodList(authUser, wodListInput);
    }

    @Role(["Any"])
    @Query(type => OneWodOutput)
    async wod(
        @Args('input') oneWodInput:OneWodInput
    ):Promise<OneWodOutput> {
        return this.wodService.findWodById(oneWodInput);
    }
}

@Resolver(of => Category)
export class CategoryResolver {
    constructor(private readonly wodService: WodService) {}

    // @ResolveField(type => Int)
    // wodCount(@Parent() category:Category): Promise<number> {
    //     return this.wodService.countWod(category);
    // }

    @Query(type => AllCategoriesOutput)
    allCategories() :Promise<AllCategoriesOutput> {
        return this.wodService.allCategories();
    }

    @Query(type => CategoryOutput)
    findCategoryBySlug(@Args('input') categoryInput:CategoryInput):Promise<CategoryOutput> {
        return this.wodService.findCategoryBySlug(categoryInput);
    }
}