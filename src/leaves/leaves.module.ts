
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LeavesController } from './leaves.controller';
import { LeavesService } from './leaves.service';
import { Leave } from './leave.entity';
import { Employee } from '../employees/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Leave, Employee])],
  controllers: [LeavesController],
  providers: [LeavesService],
})
export class LeavesModule {}
