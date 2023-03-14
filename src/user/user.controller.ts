import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param() id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete('/logoff')
  @UseGuards(JwtAuthGuard)
  async remove(@Req() req) {
    await this.userService.remove(req);
  }
}
