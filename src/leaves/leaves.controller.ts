
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
import { LeavesService } from './leaves.service';
import { Leave } from './leave.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/leaves')
@UseGuards(JwtAuthGuard)
export class LeavesController {
  constructor(
    private readonly leavesService: LeavesService,
  ) {}

  // CREATE - Employee can submit their own leave request
  @Post()
  create(@Body() data: Partial<Leave>, @Req() req: any) {
    const employeeID = req.user.EmployeeID;

    if (req.user.Role === 'Employee') {
      if (!employeeID) {
        throw new ForbiddenException(
          'Employee account is not linked to an employee',
        );
      }

      data.EmployeeID = employeeID;
    } else if (req.user.Role !== 'Admin') {
      throw new ForbiddenException('Access denied');
    }

    return this.leavesService.create(data);
  }

  // READ - Get all leave requests (Admin only)
  @Get()
  @UseGuards(RolesGuard)
  @Roles('Admin')
  findAll() {
    return this.leavesService.findAll();
  }

  // READ - Get logged-in employee's leave requests
  @Get('my-requests')
  @UseGuards(RolesGuard)
  @Roles('Employee')
  findMyLeaves(@Req() req: any) {
    const employeeID = req.user.EmployeeID;

    if (!employeeID) {
      throw new ForbiddenException(
        'Employee account is not linked to an employee',
      );
    }

    return this.leavesService.findMyLeaves(employeeID);
  }

  // READ - Get one leave request (Admin only)
  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('Admin')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.leavesService.findOne(id);
  }

  // UPDATE - Admin only
  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('Admin')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Leave>,
  ) {
    return this.leavesService.update(id, data);
  }

  // PARTIAL UPDATE - Admin only
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('Admin')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Leave>,
  ) {
    return this.leavesService.update(id, data);
  }

  // DELETE - Admin only
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('Admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.leavesService.remove(id);
  }
}
