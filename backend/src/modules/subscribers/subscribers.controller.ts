import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { ApiTags } from '@nestjs/swagger';
import { ID } from '../../common/types/Id.type';
import { UserService } from '../user/user.service';

@ApiTags('subscribers')
@Controller('subscribers')
export class SubscribersController {
  constructor(
    private readonly subscribersService: SubscribersService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createSubscriberDto: CreateSubscriberDto) {
    await this.userService.findOneById(createSubscriberDto.userId);

    await this.subscribersService.findOneByUserId(createSubscriberDto.userId);

    return this.subscribersService.create(createSubscriberDto);
  }

  @Get()
  findAll() {
    return this.subscribersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: ID) {
    return this.subscribersService.findOneById(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: ID) {
    return this.subscribersService.delete(id);
  }
}
