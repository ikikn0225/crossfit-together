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
import { Request, Response } from 'express';
import { encryptValue, decryptValue } from 'src/crypto';
import { EditPasswordInput, EditPasswordOutput } from './dtos/edit-password.dto';
import { GraphQLExecutionContext } from 'graphql-tools';

const EXPIRED = 1000 * 60 * 60 * 24 * 7;

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
                return {ok:false, error:'이미 회원이 가입된 이메일입니다.'};
            const affiliatedBox = await this.boxs.findOne({name:myBox});
            
        
            if(role === 'Coach') { //Coach
                user = await this.users.save(this.users.create({name, email, password, role, profileImg}));
            } else { //Crossfiter
                user = await this.users.save(this.users.create({name, email, password, role, affiliatedBox, profileImg}));
            }
            const verification = await this.verification.save(
                this.verification.create({ user })
            );
            
            this.mailService.sendVerificationEmail(user.name, user.email, verification.code);
            return {ok: true};
        } catch (e) {
            return {ok:false, error:'계정을 생성할 수 없습니다.'};
        }
    }

    async login(
        { email, password }: LoginInput,
        context: GraphQLExecutionContext,
        ): Promise<LoginOutput> {
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
            const accessToken = await this.jwtService.sign(user.id, '1m');
            const refreshToken = await this.jwtService.sign(user.id, '7d');
            this.updateRefreshToken(user.id, refreshToken);
            return {
                ok: true,
                token:encryptValue(accessToken),
                refreshToken:encryptValue(refreshToken),
            }
        } catch (error) {
            return {
                ok: false,
                error,
            }
        }
    }

    async updateRefreshToken(id: number, refreshToken: string | null) {
        await this.users.update(id, {refreshToken});
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

    async editPassword(
        userId:number,
        { currentPw, changePw }:EditPasswordInput
    ):Promise<EditPasswordOutput> {
        try {
            const user = await this.users.findOne(userId, {select:['id', 'password']});
            if(!user) {
                return {
                    ok:false,
                    error: '회원이 아닙니다.',
                }
            }

            const passwordCorrect = await user.checkPassword(decryptValue(currentPw));
            if(!passwordCorrect) {
                return {
                    ok:false,
                    error: '현재 비밀번호가 틀렸습니다.',
                }
            }
            
            
            if(changePw) {
                user.password = decryptValue(changePw);
            }
            await this.users.save(user);
            return {ok:true,}
        } catch (error) {
            return {
                ok:false,
                error: '비밀번호를 변경할 수 없습니다.'
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
