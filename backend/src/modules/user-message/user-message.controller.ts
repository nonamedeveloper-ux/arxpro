import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserMessageService } from './user-message.service';
import { CreateUserMessageDto } from './dto/create-user-message.dto';
import { ApiTags } from '@nestjs/swagger';
import { ID } from '../../common/types/Id.type';

@ApiTags('user_message')
@Controller('user-message')
export class UserMessageController {
  constructor(private readonly userMessageService: UserMessageService) {}

  @Post()
  create(@Body() createUserMessageDto: CreateUserMessageDto) {
    return this.userMessageService.create(createUserMessageDto);
  }

  @Get()
  findAll() {
    return this.userMessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: ID) {
    return this.userMessageService.findOneById(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: ID) {
    return this.userMessageService.delete(id);
  }
}
