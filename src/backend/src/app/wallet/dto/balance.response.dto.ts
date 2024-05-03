import { ApiProperty } from "@nestjs/swagger";

export class BalanceResponseDTO {
    constructor(balance: number) {
        this.balance = balance;
    }

    @ApiProperty({ description: 'The balance of the wallet' })
    balance!: number;
}