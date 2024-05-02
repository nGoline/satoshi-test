import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDTO {
    @ApiProperty({ description: 'The email of the user' })
    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @ApiProperty({ description: 'The password of the user' })
    @IsNotEmpty({ message: 'Password cannot be empty' })
    password: string;
}