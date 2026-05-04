import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserPhoneSuchExseption } from "./exception/user.exception";
import { ID } from "src/common/types/Id.type";
import { RoleEnum } from "src/common/enums/enum";
import { Auth } from "../auth/decorator/auth.decorator";
import { RolesGuard } from "../shared/guards/role.guard";
import { AuthGuard } from "../shared/guards/auth.guard";
import { ForgetPasswordDto } from "./dto/forget_password.dto";
import { FileService } from "../files/files.service";
import { NickNameIsNotException } from "../auth/exception/auth.exception";

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  @Auth(RoleEnum.ADMIN)
  @Post('/register/admin')
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    const checkPhone = await this.userService.findOneByPhone(
      createUserDto.phone,
    );

    if (checkPhone.data) {
      throw new UserPhoneSuchExseption();
    }

    createUserDto.role = RoleEnum.ADMIN;

    return this.userService.create(createUserDto);
  }

  @Post('/forget-password')
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.userService.forgetPassword(forgetPasswordDto);
  }

  @Auth(RoleEnum.ADMIN)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Auth(RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.ARCHITEKTOR)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: ID) {
    return await this.userService.findOneById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: ID,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.findOneById(id);

    if (updateUserDto.phone) {
      const checkPhone = await this.userService.findOneByPhone(
        updateUserDto.phone,
      );
      if (checkPhone.data) {
        throw new UserPhoneSuchExseption();
      }
    }

    if (updateUserDto.profileImageId) {
      await this.fileService.findOneById(updateUserDto.profileImageId);
    }

    if (updateUserDto.backgroundImageId) {
      await this.fileService.findOneById(updateUserDto.backgroundImageId);
    }

    if (updateUserDto.nickName) {
      const foundUser = await this.userService.findOneByNickName(
        updateUserDto.nickName,
      );
      if (foundUser) {
        throw new NickNameIsNotException();
      }
    }

    return this.userService.updated(updateUserDto, id);
  }

  @Auth(RoleEnum.ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: ID) {
    return await this.userService.delete(id);
  }
}
