import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { Auth } from 'src/auth/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}


  @Get()
  // @Auth(ValidRoles.admin)
  executeSeed() {
    this.seedService.runSeed();
    return 'Seed executed'
  }

}
