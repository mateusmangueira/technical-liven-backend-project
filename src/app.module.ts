import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }
  ), MongooseModule.forRoot(process.env.MONGO_URL, {
    useNewUrlParser: true,
  }), UsersModule, AddressesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
