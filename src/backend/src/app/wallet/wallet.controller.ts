import { Controller, HttpException, HttpStatus, Param, ParseUUIDPipe, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { WalletService } from "./wallet.service";

@ApiTags('Wallet')
@Controller('wallets')
export class WalletController {
    constructor(private authService: WalletService) { }

    @Get('/:id/balance')
    async getBalance(@Param('id', new ParseUUIDPipe()) id: string) {
        const balance = await this.authService.getBalance(id);
        if (Number.isNaN(balance)) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return { balance };
    }
}