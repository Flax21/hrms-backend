
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('Department')
export class Department {
  @PrimaryGeneratedColumn()
  DepartmentID: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  DepartmentName: string;

  @Column({ type: 'varchar', length: 100 })
  Location: string;
}
