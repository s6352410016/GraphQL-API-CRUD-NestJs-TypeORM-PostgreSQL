import { Module } from '@nestjs/common';
import { EmployeeResolver } from './employee.resolver';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeSchema } from './schema/employee.schema';

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeSchema])],
    providers: [EmployeeResolver , EmployeeService]
})
export class EmployeeModule {}
