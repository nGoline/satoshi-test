import { Module } from '@nestjs/common';
import { UserDatabaseModule } from 'src/database/user/user.module';
import { UserService } from './user.service';

@Module({
    imports: [UserDatabaseModule],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }