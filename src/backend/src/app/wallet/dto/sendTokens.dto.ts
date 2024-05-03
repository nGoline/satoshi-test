import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsUUID } from "class-validator";

export class SendTokensDTO {
    @ApiProperty({ description: 'The amount to be sent' })
    @IsNotEmpty({ message: 'Amount cannot be empty' })
    @IsInt({ message: 'Amount must be an integer' })
    @IsPositive({ message: 'Amount must be positive' })
    amount: number;

    @ApiProperty({ description: 'The receiver id' })
    @IsNotEmpty({ message: 'Receiver id cannot be empty' })
    @IsUUID(4, { message: 'Invalid receiver id' })
    receiverId: string;

    @ApiProperty({ description: 'The sender id' })
    @IsNotEmpty({ message: 'Sender id cannot be empty' })
    @IsUUID(4, { message: 'Invalid sender id' })
    senderId: string;
}