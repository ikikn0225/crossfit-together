import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthUserGuard } from 'src/auth/auth.guard';
import { AuthGuard } from 'src/auth/auth-plus.guard';
import { Role } from 'src/auth/role-decorator';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { DeleteAccountOutput } from './dtos/delete-account.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { VerifyEmailInput, VerifyEmailOutput } from './dtos/verify-email.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {

    constructor( private readonly userService:UserService ) {}
    
    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        return this.userService.createAccount(createAccountInput);
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        return this.userService.login(loginInput);
    }

    @Role(['Any'])
    @Query(returns => User)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser:User){
        return authUser;
    }

    @Role(['Any'])
    @Query(returns => UserProfileOutput)
    @UseGuards(AuthUserGuard)
    async userProfile(
        @Args() userProfileInput: UserProfileInput
    ):Promise<UserProfileOutput> {
        return this.userService.findById(userProfileInput.userId);
    }

    @Role(['Any'])
    @Mutation(returns => EditProfileOutput)
    @UseGuards(AuthUserGuard)
    async editProfile(
        @AuthUser() authUser:User,
        @Args('input') editProfileInput:EditProfileInput):Promise<EditProfileOutput> {
            try {
                await this.userService.editProfile(authUser.id, editProfileInput);
                return {
                    ok: true,
                }
            } catch (error) {
                return {
                    ok: false,
                    error
                }
            }
    }

    @Role(['Any'])
    @Mutation(type => DeleteAccountOutput)
    async deleteAccount(
        @AuthUser() authUser:User
    ): Promise<DeleteAccountOutput> {
        return this.userService.deleteAccount(authUser.id);
    }

    @Mutation(returns => VerifyEmailOutput)
    verifyEmail(
        @Args('input') { code }: VerifyEmailInput,
        ): Promise<VerifyEmailOutput> {
        return this.userService.verifyEmail(code);
    }
}