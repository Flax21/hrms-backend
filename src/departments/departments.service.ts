
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  // CREATE
  async create(data: Partial<Department>) {
    const department = this.departmentRepository.create(data);
    return await this.departmentRepository.save(department);
  }

  // READ ALL
  async findAll() {
    return await this.departmentRepository.find();
  }

  // READ ONE
  async findOne(id: number) {
    const department = await this.departmentRepository.findOneBy({
      DepartmentID: id,
    });

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    return department;
  }

  // UPDATE
  async update(id: number, data: Partial<Department>) {
    const department = await this.findOne(id);
    Object.assign(department, data);
    return await this.departmentRepository.save(department);
  }

  // DELETE
  async remove(id: number) {
    const department = await this.findOne(id);
    await this.departmentRepository.remove(department);
    return { message: 'Department deleted successfully' };
  }
}
