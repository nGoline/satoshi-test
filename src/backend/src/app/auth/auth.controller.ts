import { Controller, Post, Body, HttpException, HttpStatus, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiConflictResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { SignupDTO } from './dto/signup.dto';
import { UserResponseDTO } from './dto/user.response.dto';
import { WalletService } from '../wallet/wallet.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private walletService: WalletService
    ) { }

    @ApiOkResponse({
        description: 'User logged in successfully',
        type: UserResponseDTO
    })
    @ApiBadRequestResponse({
        description: 'Invalid credentials / Validation Error'
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error'
    })
    @Post('login')
    async login(@Body() body: LoginDTO): Promise<UserResponseDTO> {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        // Get wallet data
        const wallet = await this.walletService.getWalletByUserId(user.id);
        if (!wallet) {
            throw new HttpException('Wallet not found for user, contact support.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new UserResponseDTO(user.id, user.email, wallet.id);
    }

    @ApiOkResponse({
        description: 'User logged in successfully',
        type: UserResponseDTO
    })
    @ApiConflictResponse({
        description: 'Email address already exists'
    })
    @ApiBadRequestResponse({
        description: 'Signup failed / Validation error'
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error'
    })
    @Post('signup')
    async signUp(@Body() body: SignupDTO): Promise<UserResponseDTO> {
        try {
            const user = await this.authService.signUp(body.email, body.password);
            return user as UserResponseDTO;
        } catch (error) {
            if (error instanceof ConflictException) {
                throw new HttpException(error.message, HttpStatus.CONFLICT);
            }
            throw new HttpException('Signup failed', HttpStatus.BAD_REQUEST);
        }
    }
}
