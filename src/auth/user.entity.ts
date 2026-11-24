
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';

import { Employee } from '../employees/employee.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  UserID: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  Username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  Email: string;

  @Column({ type: 'varchar', length: 255 })
  Password: string;

  @Column({ type: 'varchar', length: 20, default: 'Employee' })
  Role: string;

  @OneToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: 'EmployeeID' })
  Employee: Employee | null;

  @RelationId((user: User) => user.Employee)
  EmployeeID: number | null;
}
