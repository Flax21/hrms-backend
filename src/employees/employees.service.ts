
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { Department } from '../departments/department.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  // CREATE
  async create(data: Partial<Employee>) {
    const department = await this.departmentRepository.findOneBy({
      DepartmentID: data.DepartmentID,
    });

    if (!department) {
      throw new BadRequestException('Department does not exist');
    }

    const employee = this.employeeRepository.create(data);
    return await this.employeeRepository.save(employee);
  }

 
  // READ ALL
  async findAll() {
    return await this.employeeRepository.find({
      relations: {
        Department: true,
      },
    });
  }

  // READ ONE
  async findOne(id: number) {
    const employee = await this.employeeRepository.findOne({
      where: { EmployeeID: id },
      relations: {
        Department: true,
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  // UPDATE
  async update(id: number, data: Partial<Employee>) {
    const employee = await this.findOne(id);

    if (data.DepartmentID !== undefined) {
      const department = await this.departmentRepository.findOneBy({
        DepartmentID: data.DepartmentID,
      });

      if (!department) {
        throw new BadRequestException('Department does not exist');
      }
    }

    Object.assign(employee, data);
    return await this.employeeRepository.save(employee);
  }

  // DELETE
  async remove(id: number) {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);

    return { message: 'Employee deleted successfully' };
  }
}
