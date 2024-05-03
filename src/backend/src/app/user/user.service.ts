import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../database/user/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/database/user/user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
  ) { }

  async createUser(email: string, password: string): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.createUser(email, hashedPassword);;
  }

  findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneByEmail(email);
  }
}
