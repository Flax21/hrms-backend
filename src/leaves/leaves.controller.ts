
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

import { LeavesService } from './leaves.service';
import { Leave } from './leave.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/leaves')
@UseGuards(JwtAuthGuard)
export class LeavesController {
  constructor(
    private readonly leavesService: LeavesService,
  ) {}

  // CREATE - Submit leave request
  @Post()
  create(@Body() data: Partial<Leave>) {
    return this.leavesService.create(data);
  }

  // READ - Get all leave requests
  @Get()
  findAll() {
    return this.leavesService.findAll();
  }

  // READ - Get one leave request
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.leavesService.findOne(id);
  }

  // UPDATE - Edit leave request
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Leave>,
  ) {
    return this.leavesService.update(id, data);
  }

  // PARTIAL UPDATE
  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Leave>,
  ) {
    return this.leavesService.update(id, data);
  }

  // DELETE - Remove leave request
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.leavesService.remove(id);
  }
}
