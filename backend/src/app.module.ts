import { Module } from '@nestjs/common';
import { ArchitektorModule } from './modules/architektor/architektor.module';
import { AdminModule } from './modules/admin/admin.module';
import { FileModule } from './modules/files/files.module';
import { ProjectModule } from './modules/project/project.module';
import { NewsModule } from './modules/news/news.module';
import { ProjectCategoryModule } from './modules/project_category/project_category.module';
import { RegionModule } from './modules/region/region.module';
import { DistrictModule } from './modules/district/district.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { config, typeOrmConfig } from './common/config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { HomeTitleModule } from './modules/home-title/home-title.module';
import { SharedModule } from './modules/shared/shared.module';
import { PlansModule } from './modules/plans/plans.module';
import { ConfigModule } from '@nestjs/config';
import { DescriptionModule } from './modules/description/description.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { LikeAndDislikeModule } from './modules/like_and_dislike/like_and_dislike.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FloorModule } from './modules/floor/floor.module';
import { UserMessageModule } from './modules/user-message/user-message.module';
import { ContactUsModule } from './modules/contact-us/contact-us.module';
import { SubscribersModule } from './modules/subscribers/subscribers.module';
import { CommentModule } from './modules/comment/comment.module';
import { OrderModule } from './modules/order/order.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule globally available
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: { host: config.redisHost, port: config.redisPort },
          ttl: 10 * 60 * 1000 /** 10 min */,
        });

        return { store };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'medias'),
      serveRoot: '/medias/',
    }),
    AuthModule,
    SharedModule,
    ArchitektorModule,
    UserModule,
    AdminModule,
    FileModule,
    ProjectModule,
    NewsModule,
    ProjectCategoryModule,
    RegionModule,
    DistrictModule,
    HomeTitleModule,
    PlansModule,
    DescriptionModule,
    LikeAndDislikeModule,
    FloorModule,
    UserMessageModule,
    ContactUsModule,
    SubscribersModule,
    CommentModule,
    OrderModule,
    AnalyticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
