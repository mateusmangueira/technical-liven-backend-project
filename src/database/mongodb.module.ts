import { Module } from '@nestjs/common';
import { mongodb } from './mongodb.providers';

@Module({
  providers: [...mongodb],
  exports: [...mongodb],
})
export class DatabaseModule { }