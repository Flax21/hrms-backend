
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
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/employees')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
  ) {}

  // CREATE - Add an employee
  @Post()
  create(@Body() data: Partial<Employee>) {
    return this.employeesService.create(data);
  }

  // READ - Get all employees
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  // READ - Get one employee
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.findOne(id);
  }

  // UPDATE - Edit employee information
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Employee>,
  ) {
    return this.employeesService.update(id, data);
  }

  // PARTIAL UPDATE
  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Employee>,
  ) {
    return this.employeesService.update(id, data);
  }

  // DELETE - Remove an employee
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.employeesService.remove(id);
  }
}
