import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProjectEntity } from '../project/entities/project.entity';
import { OrderEntity } from '../order/entities/order.entity';
import { ArchitektorEntity } from '../architektor/entities/architektor.entity';
import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/Id.type';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ArchitektorEntity)
    private readonly architektorRepository: Repository<ArchitektorEntity>,
  ) { }

  async getArchitectStats(userId: ID): Promise<ResData<any>> {
    // 1. Get Architect ID
    const architect = await this.architektorRepository.findOne({ where: { userId } });
    if (!architect) return new ResData('Architect not found', 404);

    // 2. Total Projects
    const totalProjects = await this.projectRepository.count({ where: { architektorId: architect.id as ID } });

    // 3. Total Clients (Unique users who ordered architect's projects)
    const architectProjects = await this.projectRepository.find({ where: { architektorId: architect.id as ID }, select: ['id'] });
    const projectIds = architectProjects.map(p => p.id);

    let totalClients = 0;
    if (projectIds.length > 0) {
      const result = await this.orderRepository
        .createQueryBuilder('orders')
        .select('COUNT(DISTINCT orders.userId)', 'count')
        .where('orders.projectId IN (:...projectIds)', { projectIds })
        .getRawOne();
      totalClients = parseInt(result.count);
    }

    // 4. Recent Activity (Latest orders)
    const recentActivity = [];
    if (projectIds.length > 0) {
      const latestOrders = await this.orderRepository.find({
        where: { projectId: In(projectIds) as any },
        relations: ['project', 'user'],
        order: { createdAt: 'DESC' },
        take: 5
      });

      latestOrders.forEach(order => {
        recentActivity.push({
          id: order.id,
          type: 'client',
          title: `New order from ${order.user?.nickName || 'User'} for Project #${order.project?.name}`,
          time: order.createdAt,
          path: '/clients'
        });
      });
    }

    return new ResData('Architect stats fetched', 200, {
      stats: [
        { title: 'Total Projects', value: totalProjects.toString(), change: '+0', path: '/projects' },
        { title: 'Total Clients', value: totalClients.toString(), change: '+0', path: '/clients' },
        { title: 'Messages', value: '0', change: '+0', path: '/messages' },
        { title: 'Profile Views', value: architect.viewsCount.toString(), change: '+0', path: '/analytics' },
      ],
      recentActivity
    });
  }
}
