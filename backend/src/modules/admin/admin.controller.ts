import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UserService } from '../user/user.service';
import { RoleEnum } from 'src/common/enums/enum';
import { UserNotAdminException } from './exception/admin.exception';
import { ID } from 'src/common/types/Id.type';
import { FileService } from '../files/files.service';
import { Auth } from '../auth/decorator/auth.decorator';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  @Auth(RoleEnum.ADMIN)
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    const checkUser = await this.userService.findOneById(createAdminDto.userId);

    if (!(checkUser.data.role === RoleEnum.ADMIN)) {
      throw new UserNotAdminException();
    }

    await this.adminService.findOneUserId(createAdminDto.userId);

    if (createAdminDto.fileId) {
      await this.fileService.findOneById(createAdminDto.fileId);
    }

    return await this.adminService.create(createAdminDto);
  }

  @Auth(RoleEnum.ADMIN)
  @Get()
  async findAll() {
    return await this.adminService.findAll();
  }

  @Auth(RoleEnum.ADMIN)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: ID) {
    return await this.adminService.findOneById(id);
  }

  @Auth(RoleEnum.ADMIN)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: ID,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    const checkUser = await this.userService.findOneById(updateAdminDto.userId);

    if (!(checkUser.data.role === RoleEnum.ADMIN)) {
      throw new UserNotAdminException();
    }

    await this.adminService.findOneUserId(updateAdminDto.userId);

    if (updateAdminDto.fileId) {
      await this.fileService.findOneById(updateAdminDto.fileId);
    }
    return this.adminService.updated(updateAdminDto, id);
  }

  @Auth(RoleEnum.ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: ID) {
    return await this.adminService.delete(id);
  }
}
