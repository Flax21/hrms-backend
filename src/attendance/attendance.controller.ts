
import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { AttendanceService } from './attendance.service';
import { Attendance } from './attendance.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
  ) {}

  // CREATE - Record attendance
  @Post()
  create(@Body() data: Partial<Attendance>) {
    return this.attendanceService.create(data);
  }

  // READ - Get all attendance records
  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  // READ - Get one attendance record
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.attendanceService.findOne(id);
  }

  // UPDATE - Edit attendance
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Attendance>,
  ) {
    return this.attendanceService.update(id, data);
  }

  // PARTIAL UPDATE
  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Attendance>,
  ) {
    return this.attendanceService.update(id, data);
  }

  // DELETE - Remove attendance
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.attendanceService.remove(id);
  }
}
