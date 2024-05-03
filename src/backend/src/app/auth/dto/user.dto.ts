import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
    constructor(id: string, email: string, walletId: string) {
        this.id = id;
        this.email = email;
        this.walletId = walletId;
    }

    @ApiProperty({ description: 'The email of the user' })
    email!: string;

    @ApiProperty({ description: 'The id of the user' })
    id!: string;

    @ApiProperty({ description: 'The walletId of the user' })
    walletId!: string;
}