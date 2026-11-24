
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Department } from '../departments/department.entity';

@Entity('Employee')
export class Employee {
  @PrimaryGeneratedColumn()
  EmployeeID: number;

  @Column({ type: 'int' })
  DepartmentID: number;

  @Column({ type: 'varchar', length: 50 })
  FirstName: string;

  @Column({ type: 'varchar', length: 50 })
  LastName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  Email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  PhoneNumber: string | null;

  @Column({ type: 'varchar', length: 100 })
  Position: string;

  @Column({ type: 'date' })
  DateHired: string;

  @ManyToOne(() => Department, { nullable: false })
  @JoinColumn({ name: 'DepartmentID' })
  Department: Department;
}
