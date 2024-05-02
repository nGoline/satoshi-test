import { Controller, Post, Body, HttpException, HttpStatus, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { SignupDTO } from './dto/signup.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body: LoginDTO) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    @Post('signup')
    async signUp(@Body() body: SignupDTO) {
        try {
            const user = await this.authService.signUp(body.email, body.password);
            return user;
        } catch (error) {
            if (error instanceof ConflictException) {
                throw new HttpException(error.message, HttpStatus.CONFLICT);
            }
            throw new HttpException('Signup failed', HttpStatus.BAD_REQUEST);
        }
    }
}
