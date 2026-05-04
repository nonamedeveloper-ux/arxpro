import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ArchitektorService } from './architektor.service';
import { CreateArchitektorDto } from './dto/create-architektor.dto';
import { UpdateArchitektorDto } from './dto/update-architektor.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ID } from 'src/common/types/Id.type';
import { UserService } from '../user/user.service';
import { RoleEnum } from 'src/common/enums/enum';
import { ArchitektorNotAdminException } from './exception/architektor.exception';
import { FileService } from '../files/files.service';
import { DistrictService } from '../district/district.service';
import { RolesGuard } from '../shared/guards/role.guard';
import { AuthGuard } from '../shared/guards/auth.guard';
import { Auth } from '../auth/decorator/auth.decorator';

@ApiTags('architecture')
@Controller('architecture')
export class ArchitektorController {
  constructor(
    private readonly architektorService: ArchitektorService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly districtService: DistrictService,
  ) {}

  @Auth(RoleEnum.ADMIN, RoleEnum.ARCHITEKTOR)
  @Post()
  async create(@Body() createArchitektorDto: CreateArchitektorDto) {
    await this.architektorService.findOneByNickeName(
      createArchitektorDto.nickName,
    );

    const checkUser = await this.userService.findOneById(
      createArchitektorDto.userId,
    );

    if (!(checkUser.data.role === RoleEnum.ARCHITEKTOR)) {
      throw new ArchitektorNotAdminException();
    }

    if (createArchitektorDto.profileImageId) {
      await this.fileService.findOneById(createArchitektorDto.profileImageId);
    }

    if (createArchitektorDto.backgroundImageId) {
      await this.fileService.findOneById(
        createArchitektorDto.backgroundImageId,
      );
    }

    if (createArchitektorDto.districtId) {
      await this.districtService.findOneById(createArchitektorDto.districtId);
    }

    return this.architektorService.create(createArchitektorDto);
  }

  @Get()
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'nickName',
    required: false,
    type: String,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'regionName',
    required: false,
    type: String,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  async searchArchitects(
    @Query('category') category?: string,
    @Query('nickName') nickName?: string,
    @Query('regionName') regionName?: string,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const sizeNumber = parseInt(pageSize, 10) || 10;

    return this.architektorService.searchArchitects(
      category,
      nickName,
      regionName,
      pageNumber,
      sizeNumber,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get('user/:userId')
  async findByUserId(@Param('userId', ParseUUIDPipe) userId: ID) {
    return await this.architektorService.findOneByUserId(userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get('architektor/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: ID) {
    return this.architektorService.findOneById(id);
  }

  @Get('top-rated')
  async getTopArchitects() {
    return this.architektorService.getTopArchitectsByRating();
  }

  @Get('categories')
  async getCategories() {
    return this.architektorService.getUniqueCategories();
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.ARCHITEKTOR)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: ID,
    @Body() updateArchitektorDto: UpdateArchitektorDto,
  ) {
    if (updateArchitektorDto.nickName) {
      await this.architektorService.findOneByNickeName(
        updateArchitektorDto.nickName,
      );
    }

    if (updateArchitektorDto.userId) {
      const checkUser = await this.userService.findOneById(
        updateArchitektorDto.userId,
      );

      if (!(checkUser.data.role === RoleEnum.ARCHITEKTOR)) {
        throw new ArchitektorNotAdminException();
      }
    }

    if (updateArchitektorDto.profileImageId) {
      await this.fileService.findOneById(updateArchitektorDto.profileImageId);
    }

    if (updateArchitektorDto.backgroundImageId) {
      await this.fileService.findOneById(
        updateArchitektorDto.backgroundImageId,
      );
    }

    if (updateArchitektorDto.districtId) {
      await this.districtService.findOneById(updateArchitektorDto.districtId);
    }

    return this.architektorService.updated(updateArchitektorDto, id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.ARCHITEKTOR)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: ID) {
    return this.architektorService.delete(id);
  }
}
