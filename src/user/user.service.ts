import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)         
            private readonly users: Repository<User>,
        @InjectRepository(Verification) 
            private readonly verification: Repository<Verification>,
        private readonly jwtService: JwtService,
    ) {}

    async createAccount({ name, email, password, role, affiliated }: CreateAccountInput): Promise<{ok: boolean; error?:string;}> {
        try {
            const userExist = await this.users.findOne({email});
            if(userExist) 
                return {ok:false, error:'There is an existed user with the email'};

            const user = await this.users.save(this.users.create({name, email, password, role, affiliated}));
            const verification = await this.verification.save(
                this.verification.create({ user })
            );
            return {ok: true};
        } catch (e) {
            return {ok:false, error:'Could not create account.'};
        }
    }

    async login({ email, password }: LoginInput): Promise<{ ok:boolean; error?:string; token?:string }> {
        try {
            const user = await this.users.findOne({email});
            if(!user) 
                return {
                    ok:false,
                    error: 'User not found',
                }
            const passwordCorrect = await user.checkPassword(password);
            if(!passwordCorrect)
                return {
                    ok:false,
                    error: 'Password is not correct',
                }
            const token = await this.jwtService.sign(user.id);
            return {
                ok: true,
                token,
            }
        } catch (error) {
            return {
                ok: false,
                error,
            }
        }
    }

    async findById(id: number): Promise<UserProfileOutput> {
        try {
            const user = await this.users.findOneOrFail({id});
            if(user) {
                return {
                    ok: true,
                    user,
                }
            }
        } catch (error) {
            return {
                ok:false,
                error:'User not found.',
            }
        }
    }

    async editProfile(
        userId:number,
        { email, password }:EditProfileInput
    ):Promise<EditProfileOutput> {
        try {
            const  user = await this.users.findOne(userId);
            if(email) {
                user.email = email;
                user.verified = false;
                await this.verification.save(this.verification.create({user}));
            }
            if(password) {
                user.password = password;
            }
            await this.users.save(user);
            return {ok:true,}
        } catch (error) {
            return {
                ok:false,
                error: 'Could not update profile'
            }
        }
    }
}
