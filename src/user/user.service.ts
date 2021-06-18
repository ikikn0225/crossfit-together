import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    getAll(): Promise<User[]> {
        return this.users.find();
    }

    async createAccount({ name, email, password, role, affiliated }: CreateAccountInput): Promise<{ok: boolean; error?:string;}> {
        try {
            const user = await this.users.findOne({email});
            if(user) 
                return {ok:false, error:'There is an existed user with the email'};

            await this.users.save(this.users.create({name, email, password, role, affiliated}));
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

    async findById(id: number): Promise<User> {
        return this.users.findOne({ id });
    }
}
