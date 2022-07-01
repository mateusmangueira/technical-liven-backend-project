import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './auth/auth.module';

import jwtConstants from './auth/constants';

@Module({
  imports: [ConfigModule.forRoot({
    load: [jwtConstants],
    isGlobal: true
  }
  ), UsersModule, AddressesModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
