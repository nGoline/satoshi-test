import { ConflictException, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { QueryFailedError } from 'typeorm';
import { UserService } from '../user/user.service';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private walletService: WalletService
    ) { }

    private readonly logger = new Logger(AuthService.name);

    async signUp(email: string, user_password: string): Promise<any> {
        try {
            // Creates new user
            const user = await this.userService.createUser(email, user_password);
            const { password, ...result } = user;

            // Creates new wallet for user with 100 tokens balance for testing purposes
            const wallet = await this.walletService.createWallet(user.id, 100);

            return { ...result, walletId: wallet.id };
        } catch (error) {
            if (error instanceof QueryFailedError && error.message.includes('duplicate key value')) {
                throw new ConflictException('Email address already exists');
            }

            this.logger.error(`Signup Error: ${error}`);

            throw error;
        }
    }

    async validateUser(email: string, password: string): Promise<any> {
        try {
            const user = await this.userService.findOneByEmail(email);
            if (user && bcrypt.compareSync(password, user.password)) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        } catch (error) {
            this.logger.error(`Validate User Error: ${error}`);
            throw error;
        }
    }
}
