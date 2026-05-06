import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../shared/guards/auth.guard';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('architect-stats')
  async getArchitectStats(@Req() req: any) {
    return await this.analyticsService.getArchitectStats(req.user.id);
  }
}
