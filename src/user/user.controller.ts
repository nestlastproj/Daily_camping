import { Controller, Delete, Get, Param } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { Public } from 'src/skip-auth.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: number): Promise<User | undefined> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param() id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
