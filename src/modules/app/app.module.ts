import appConfig from '@config/app.config';
import databaseConfig from '@config/database.config';
import { AppDataSource } from '@database/index';
import { TypeOrmConfigService } from '@database/typeorm-config.service';
import { AuthModule } from '@modules/auth/auth.module';
import { BenhkhopgoiModule } from '@modules/benhkhopgoi/benhkhopgoi.module';
import { TenantModule } from '@modules/tenant/tenant.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppConfig } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from '@modules/role/role.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    LoggerModule.forRoot(AppConfig.getLoggerConfig()),
    AuthModule,
    BenhkhopgoiModule,
    TenantModule,
    RoleModule,
    UserModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
