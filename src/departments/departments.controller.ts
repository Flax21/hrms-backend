
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
import { DepartmentsService } from './departments.service';
import { Department } from './department.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('api/v1/departments')
@UseGuards(JwtAuthGuard)
export class DepartmentsController {
  constructor(
    private readonly departmentsService: DepartmentsService,
  ) {}

  // CREATE - Add a department
  @Post()
  create(@Body() data: Partial<Department>) {
    return this.departmentsService.create(data);
  }

  // READ - Get all departments
  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  // READ - Get one department
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.findOne(id);
  }

  // UPDATE - Edit a department
  @Put(':id')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Department>,
  ) {
    return this.departmentsService.update(id, data);
  }

  // DELETE - Remove a department
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.departmentsService.remove(id);
  }
  
}
