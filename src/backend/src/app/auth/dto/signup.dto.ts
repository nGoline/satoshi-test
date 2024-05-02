import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class SignupDTO {
    @ApiProperty({ description: 'The email of the user' })
    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @ApiProperty({ description: 'The password of the user' })
    @IsNotEmpty({ message: 'Password cannot be empty' })
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
    password: string;
}