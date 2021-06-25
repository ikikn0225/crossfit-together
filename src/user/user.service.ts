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

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)         
            private readonly users: Repository<User>,
        @InjectRepository(Verification) 
            private readonly verification: Repository<Verification>,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
    ) {}

    async createAccount({ name, email, password, role, myBox }: CreateAccountInput): Promise<CreateAccountOutput> {
        try {
            const userExist = await this.users.findOne({email});
            if(userExist) 
                return {ok:false, error:'There is an existed user with the email'};

            const user = await this.users.save(this.users.create({name, email, password, role, myBox}));
            const verification = await this.verification.save(
                this.verification.create({ user })
            );
            this.mailService.sendVerificationEmail(user.name, user.email, verification.code);
            return {ok: true};
        } catch (e) {
            return {ok:false, error:'Could not create account.'};
        }
    }

    async login({ email, password }: LoginInput): Promise<LoginOutput> {
        try {
            const user = await this.users.findOne({email}, {select:['id', 'password']});
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
            const user = await this.users.findOne(userId);
            if(email) {
                user.email = email;
                user.verified = false;
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
