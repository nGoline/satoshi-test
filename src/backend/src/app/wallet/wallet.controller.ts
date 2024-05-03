import { Controller, HttpException, HttpStatus, Param, ParseUUIDPipe, Get, Post, Body, Logger } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { WalletService } from "./wallet.service";
import { SendTokensDTO } from "./dto/sendTokens.dto";
import { BalanceResponseDTO } from "./dto/balance.response.dto";

@ApiTags('Wallet')
@Controller('wallets')
export class WalletController {
    constructor(private walletService: WalletService) { }

    private readonly logger = new Logger(WalletController.name);

    @ApiOkResponse({
        description: 'The balance of the wallet',
        type: BalanceResponseDTO
    })
    @ApiBadRequestResponse({
        description: 'Validation error'
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error'
    })
    @Get('/:id/balance')
    async getBalance(@Param('id', new ParseUUIDPipe()) id: string) {
        try {
            const balance = await this.walletService.getBalance(id);
            if (Number.isNaN(balance)) {
                throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
            }
            return { balance };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }

    @ApiOkResponse({
        description: 'The new balance of the wallet',
        type: BalanceResponseDTO
    })
    @ApiBadRequestResponse({
        description: 'Validation error / No Balance / Wallet Not Found'
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error'
    })
    @Post('/send-tokens')
    async sendTokens(@Body() body: SendTokensDTO) {
        try {
            const newBalance = await this.walletService.sendTokens(body.senderId, body.receiverId, body.amount);
            return { balance: newBalance };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
}