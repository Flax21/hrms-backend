
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { Employee } from '../employees/employee.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,

    private jwtService: JwtService,
  ) {}

  async register(data: {
    Username: string;
    Email: string;
    Password: string;
    Role?: string;
    EmployeeID?: number;
  }) {
    const existingUser = await this.userRepository.findOne({
      where: [
        { Username: data.Username },
        { Email: data.Email },
      ],
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    
const role = 'Employee';

if (data.Role && data.Role !== 'Employee') {
  throw new BadRequestException(
    'Public registration only allows Employee accounts',
  );
}

if (data.EmployeeID === undefined || data.EmployeeID === null) {
  throw new BadRequestException(
    'EmployeeID is required for Employee accounts',
  );
}

const employee = await this.employeeRepository.findOne({
  where: { EmployeeID: data.EmployeeID },
});

if (!employee) {
  throw new BadRequestException('Employee not found');
}


    const hashedPassword = await bcrypt.hash(data.Password, 10);

    const user = this.userRepository.create({
      Username: data.Username,
      Email: data.Email,
      Password: hashedPassword,
      Role: role,
      Employee: employee,
    });

    const savedUser = await this.userRepository.save(user);

    return {
      message: 'User registered successfully',
      UserID: savedUser.UserID,
      Username: savedUser.Username,
      Email: savedUser.Email,
      Role: savedUser.Role,
      EmployeeID: employee?.EmployeeID ?? null,
    };
  }

  async login(data: {
    Username: string;
    Password: string;
  }) {
    const user = await this.userRepository.findOne({
      where: { Username: data.Username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordMatches = await bcrypt.compare(
      data.Password,
      user.Password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
      sub: user.UserID,
      username: user.Username,
      role: user.Role,
    };

    return {
      message: 'Login successful',
      access_token: await this.jwtService.signAsync(payload),
      user: {
        UserID: user.UserID,
        Username: user.Username,
        Email: user.Email,
        Role: user.Role,
      },
    };
  }
}
