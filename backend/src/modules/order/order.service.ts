import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity, OrderStatus } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProjectService } from '../project/project.service';
import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/Id.type';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly projectService: ProjectService,
  ) {}

  async create(dto: CreateOrderDto, userId: ID): Promise<ResData<OrderEntity>> {
    const { data: project } = await this.projectService.findOneById(dto.projectId);

    const newOrder = this.orderRepository.create({
      userId,
      projectId: dto.projectId,
      amount: project.price,
      status: OrderStatus.PENDING,
    });

    const savedOrder = await this.orderRepository.save(newOrder);
    return new ResData('Order created successfully', 201, savedOrder);
  }

  async findAllByUser(userId: ID): Promise<ResData<OrderEntity[]>> {
    const orders = await this.orderRepository.find({
      where: { userId },
      relations: ['project'],
      order: { createdAt: 'DESC' },
    });
    return new ResData('User orders fetched', 200, orders);
  }

  async findOne(id: ID): Promise<ResData<OrderEntity>> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['project', 'user'],
    });
    return new ResData('Order fetched', 200, order);
  }
}
