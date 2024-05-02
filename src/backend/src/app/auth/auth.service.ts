import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async signUp(email: string, user_password: string): Promise<any> {
        try {
            const user = await this.userService.createUser(email, user_password);
            const { password, ...result } = user;
            return result;
        } catch (error) {
            if (error instanceof QueryFailedError && error.message.includes('duplicate key value')) {
                throw new ConflictException('Email address already exists');
            }

            throw error;
        }
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (user && bcrypt.compareSync(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
