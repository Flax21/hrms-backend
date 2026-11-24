
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Leave } from './leave.entity';
import { Employee } from '../employees/employee.entity';

@Injectable()
export class LeavesService {
  constructor(
    @InjectRepository(Leave)
    private readonly leaveRepository: Repository<Leave>,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  // CREATE
  async create(data: Partial<Leave>) {
    const employee = await this.employeeRepository.findOneBy({
      EmployeeID: data.EmployeeID,
    });

    if (!employee) {
      throw new BadRequestException('Employee does not exist');
    }

    const leave = this.leaveRepository.create(data);
    return await this.leaveRepository.save(leave);
  }

  // READ ALL
  async findAll() {
    return await this.leaveRepository.find({
      relations: { Employee: true },
    });
  }

  // READ ONE
  async findOne(id: number) {
    const leave = await this.leaveRepository.findOne({
      where: { LeaveID: id },
      relations: { Employee: true },
    });

    if (!leave) {
      throw new NotFoundException('Leave request not found');
    }

    return leave;
  }

  // UPDATE
  async update(id: number, data: Partial<Leave>) {
    const leave = await this.findOne(id);

    if (data.EmployeeID !== undefined) {
      const employee = await this.employeeRepository.findOneBy({
        EmployeeID: data.EmployeeID,
      });

      if (!employee) {
        throw new BadRequestException('Employee does not exist');
      }
    }

    Object.assign(leave, data);

    return await this.leaveRepository.save(leave);
  }

  // DELETE
  async remove(id: number) {
    const leave = await this.findOne(id);

    await this.leaveRepository.remove(leave);

    return { message: 'Leave request deleted successfully' };
  }
}
