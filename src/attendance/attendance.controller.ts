
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
  Req,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';

import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AttendanceService } from './attendance.service';
import { Attendance } from './attendance.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
  ) {}

  // CREATE - Admin only
  @Post()
  @UseGuards(RolesGuard)
  @Roles('Admin')
  create(@Body() data: Partial<Attendance>) {
    return this.attendanceService.create(data);
  }

  // READ - Get all attendance records (Admin only)
  @Get()
  @UseGuards(RolesGuard)
  @Roles('Admin')
  findAll() {
    return this.attendanceService.findAll();
  }

  // READ - Get logged-in employee's attendance
  @Get('my-records')
  @UseGuards(RolesGuard)
  @Roles('Employee')
  findMyAttendance(@Req() req: any) {
    const employeeID = req.user.EmployeeID;

    if (!employeeID) {
      throw new ForbiddenException(
        'Employee account is not linked to an employee',
      );
    }

    return this.attendanceService.findMyAttendance(employeeID);
  }

  // READ - Get one attendance record (Admin only)
  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('Admin')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.attendanceService.findOne(id);
  }

  // UPDATE - Admin only
  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('Admin')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Attendance>,
  ) {
    return this.attendanceService.update(id, data);
  }

  // PARTIAL UPDATE - Admin only
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('Admin')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Attendance>,
  ) {
    return this.attendanceService.update(id, data);
  }

  // DELETE - Admin only
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('Admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.attendanceService.remove(id);
  }
}
