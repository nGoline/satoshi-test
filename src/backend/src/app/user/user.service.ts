import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '../../database/user/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/database/user/user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
  ) { }

  private readonly logger = new Logger(UserService.name);

  async createUser(email: string, password: string): Promise<UserEntity> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return this.userRepository.createUser(email, hashedPassword);;
    } catch (error) {
      this.logger.error(`Error creating User: ${error}`);
      throw error;
    }
  }

  findOneByEmail(email: string): Promise<UserEntity | undefined> {
    try {
      return this.userRepository.findOneByEmail(email);
    } catch (error) {
      this.logger.error(`Error finding User by email: ${error}`);
      throw error;
    }
  }
}
