import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../shared/guards/auth.guard';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateOrderDto, @Req() req: any) {
    return await this.orderService.create(dto, req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('my-orders')
  async findAllByUser(@Req() req: any) {
    return await this.orderService.findAllByUser(req.user.id);
  }
}
