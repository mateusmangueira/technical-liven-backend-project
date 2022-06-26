import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }
  ), MongooseModule.forRoot(process.env.DATABASE_URL), UsersModule, AddressesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
