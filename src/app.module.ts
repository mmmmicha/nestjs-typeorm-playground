import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ormConfig } from './orm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { CatModule } from './cat/cat.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
        AuthModule,
        UserModule,
        RoleModule,
        CatModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
