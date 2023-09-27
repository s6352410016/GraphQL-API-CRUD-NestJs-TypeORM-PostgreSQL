import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmployeeSchema } from './schema/employee.schema';
import { EmployeeService } from './employee.service';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Resolver()
export class EmployeeResolver {
    constructor(private readonly employeeService: EmployeeService) { }

    @Query(() => [EmployeeSchema])
    findAll(): Promise<EmployeeSchema[]> {
        return this.employeeService.findAll();
    }

    @Query(() => EmployeeSchema)
    find(@Args({name: "id" , type: () => Int}) id: number): Promise<EmployeeSchema>{
        return this.employeeService.find(id);
    }

    @Mutation(() => EmployeeSchema)
    async create(
        @Args({ name: "file", type: () => GraphQLUpload }) file: Upload,
        @Args({ name: "createEmployeeDto" }) createEmployeeDto: CreateEmployeeDto
    ): Promise<EmployeeSchema> {
        const fileImage = await file;
        return this.employeeService.create(fileImage, createEmployeeDto);
    }

    @Mutation(() => EmployeeSchema)
    async update(
        @Args({ name: "file", type: () => GraphQLUpload, nullable: true }) file: Upload,
        @Args({ name: "updateEmployeeDto" }) updateEmployeeDto: UpdateEmployeeDto
    ): Promise<EmployeeSchema> {
        const fileImage = await file;
        return this.employeeService.update(fileImage, updateEmployeeDto);
    }

    @Mutation(() => Boolean)
    async delete(@Args({ name: "id", type: () => Int }) id: number): Promise<Boolean> {
        return this.employeeService.delete(id);
    }
}

