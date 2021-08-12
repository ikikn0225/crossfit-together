import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';
import { VerifyEmailOutput } from './dtos/verify-email.dto';
import { MailService } from 'src/mail/mail.service';
import { DeleteAccountOutput } from './dtos/delete-account.dto';
import { AffiliatedBox } from 'src/box/entities/box.entity';
import { Context } from '@nestjs/graphql';
import { Response } from 'express';
import { encryptValue, decryptValue } from 'src/crypto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)         
            private readonly users: Repository<User>,
        @InjectRepository(Verification) 
            private readonly verification: Repository<Verification>,
        @InjectRepository(AffiliatedBox)
            private readonly boxs:Repository<AffiliatedBox>,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
    ) {}

    async createAccount({ name, email, password, role, myBox, profileImg }: CreateAccountInput): Promise<CreateAccountOutput> {
        try {
            let user = await this.users.findOne({email});
            if(user) 
                return {ok:false, error:'There is an existed user with the email'};
            const affiliatedBox = await this.boxs.findOne({name:myBox});
            
        
            if(role === 'Coach') {
                //Coach
                user = await this.users.save(this.users.create({name, email, password, role, profileImg}));
            } else {
                //Crossfiter
                user = await this.users.save(this.users.create({name, email, password, role, affiliatedBox, profileImg}));
            }
            const verification = await this.verification.save(
                this.verification.create({ user })
            );
            this.mailService.sendVerificationEmail(user.name, user.email, verification.code);
            return {ok: true};
        } catch (e) {
            return {ok:false, error:'Could not create account.'};
        }
    }

    async login({ email, password }: LoginInput, @Context() { res }: { res: Response }): Promise<LoginOutput> {
        try {
            const user = await this.users.findOne({email}, {select:['id', 'password']});
            if(!user) 
                return {
                    ok:false,
                    error: 'User not found',
                }
            const passwordCorrect = await user.checkPassword(decryptValue(password));
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

    async getById(id: number) {
        const user = await this.users.findOne({ where: { id } });
        return user;
    }

    async getByUserId(email: string) {
        const user = await this.users.findOne({
            where: { email: email }
        });
        return user;
    }

    async updateRefreshToken(id: number, refreshToken: string | null) {
        await this.users.update(id, {refreshToken});
    }
    
    async update({ id, ...updateInfo }: EditProfileInput) {
        try {
            const user = await this.users.findOne({ where: { id } });

            if(user) user.refreshToken = updateInfo.refreshToken;
            await this.users.save(user);
            return { ok: true };
        } catch (error) {
            return { ok: false, error };
        }
    }

    async findById(id: number): Promise<UserProfileOutput> {
        try {
            const user = await this.users.findOneOrFail({id}, {relations:['bors']});
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
            const user = await this.users.findOne(userId);
            if(email) {
                user.email = email;
                user.verified = false;
                await this.verification.delete({ user: { id: user.id } })
                const verification = await this.verification.save(this.verification.create({user}));
                this.mailService.sendVerificationEmail(user.name, user.email, verification.code);
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

    async deleteAccount(
        userId:number
    ): Promise<DeleteAccountOutput> {
        try {
            const user = await this.users.findOne(userId);
            if(!user) {
                return {
                    ok:false,
                    error:"User not found"
                }
            }
            await this.users.delete(user.id);

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

    async verifyEmail( code:string): Promise<VerifyEmailOutput> {
        try {
            const verification = await this.verification.findOne(
                {code},
                {relations:['user']}
            );
            if(verification) {
                verification.user.verified = true;
                await this.users.save(verification.user);
                await this.verification.delete(verification.id);
                return {ok:true};
            }
            return {ok:false, error:'verification not found'};
        } catch (error) {
            return {ok:false, error:'Could not veritfy email'};
        }
    }
}
