
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Employee } from '../employees/employee.entity';

@Entity('Attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  AttendanceID: number;

  @Column({ type: 'int' })
  EmployeeID: number;

  @Column({ type: 'date' })
  AttendanceDate: string;

  @Column({ type: 'time' })
  TimeIn: string;

  @Column({ type: 'time', nullable: true })
  TimeOut: string | null;

  @Column({ type: 'varchar', length: 20 })
  Status: string;

  @ManyToOne(() => Employee, { nullable: false })
  @JoinColumn({ name: 'EmployeeID' })
  Employee: Employee;
}
