import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ID } from '../../common/types/Id.type';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('post/:postId')
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  async getCommentsByPostId(
    @Param('postId', ParseUUIDPipe) postId: ID,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const sizeNumber = parseInt(limit, 10) || 10;
    return this.commentService.getCommentsByPostId(
      postId,
      pageNumber,
      sizeNumber,
    );
  }

  @Get(':id')
  async getOneById(@Param('id', ParseUUIDPipe) id: ID): Promise<any> {
    return await this.commentService.findOneById(id);
  }

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto): Promise<any> {
    return await this.commentService.insert(createCommentDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: ID,
    @Body() content: UpdateCommentDto,
  ): Promise<any> {
    return this.commentService.update(content, id);
  }

  @Delete(':id')
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  async delete(@Param('id', ParseUUIDPipe) id: ID): Promise<any> {
    return this.commentService.delete(id);
  }
}
