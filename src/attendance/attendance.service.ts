
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Attendance } from './attendance.entity';
import { Employee } from '../employees/employee.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  // CREATE
  async create(data: Partial<Attendance>) {
    const employee = await this.employeeRepository.findOneBy({
      EmployeeID: data.EmployeeID,
    });

    if (!employee) {
      throw new BadRequestException('Employee does not exist');
    }

    const attendance = this.attendanceRepository.create(data);
    return await this.attendanceRepository.save(attendance);
  }

  // READ ALL
  async findAll() {
    return await this.attendanceRepository.find({
      relations: { Employee: true },
    });
  }

  // READ ONE
  async findOne(id: number) {
    const attendance = await this.attendanceRepository.findOne({
      where: { AttendanceID: id },
      relations: { Employee: true },
    });

    if (!attendance) {
      throw new NotFoundException('Attendance record not found');
    }

    return attendance;
  }

  // UPDATE
  async update(id: number, data: Partial<Attendance>) {
    const attendance = await this.findOne(id);

    if (data.EmployeeID !== undefined) {
      const employee = await this.employeeRepository.findOneBy({
        EmployeeID: data.EmployeeID,
      });

      if (!employee) {
        throw new BadRequestException('Employee does not exist');
      }
    }

    Object.assign(attendance, data);

    return await this.attendanceRepository.save(attendance);
  }

  // DELETE
  async remove(id: number) {
    const attendance = await this.findOne(id);

    await this.attendanceRepository.remove(attendance);

    return { message: 'Attendance record deleted successfully' };
  }
}
