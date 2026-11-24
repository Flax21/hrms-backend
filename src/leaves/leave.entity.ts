
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Employee } from '../employees/employee.entity';

@Entity('Leave')
export class Leave {
  @PrimaryGeneratedColumn()
  LeaveID: number;

  @Column({ type: 'int' })
  EmployeeID: number;

  @Column({ type: 'varchar', length: 50 })
  LeaveType: string;

  @Column({ type: 'date' })
  StartDate: string;

  @Column({ type: 'date' })
  EndDate: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Reason: string | null;

  @Column({ type: 'varchar', length: 20, default: 'Pending' })
  Status: string;

  @ManyToOne(() => Employee, { nullable: false })
  @JoinColumn({ name: 'EmployeeID' })
  Employee: Employee;
}
