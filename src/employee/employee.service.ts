import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeSchema } from './schema/employee.schema';
import { Repository } from 'typeorm';
import * as Upload from 'graphql-upload/Upload.js';
import { uuid } from 'uuidv4';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { unlink } from 'fs/promises';

@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(EmployeeSchema) private readonly employeeRepository: Repository<EmployeeSchema>) { }

    generateNewFileName(fileImage: Upload): string {
        const fileSplit = fileImage?.filename?.split(".");
        const fileExt = fileSplit[fileSplit.length - 1];
        const fileGen = `${uuid()}.${fileExt}`;
        return fileGen;
    }

    async findAll(): Promise<EmployeeSchema[]> {
        return await this.employeeRepository.find();
    }

    async find(id: number): Promise<EmployeeSchema>{
        return await this.employeeRepository.findOneBy({id});
    }

    async create(fileImage: Upload, createEmployeeDto: CreateEmployeeDto): Promise<EmployeeSchema> {
        const { empName, empAddress, empTel, empSalary } = createEmployeeDto;

        const fileGen = this.generateNewFileName(fileImage);

        return new Promise((resolve) => {
            fileImage
                .createReadStream()
                .pipe(createWriteStream(join(process.cwd(), `images/${fileGen}`)))
                .on("finish", async () => {
                    const employeeData = this.employeeRepository.create({
                        empName,
                        empAddress,
                        empTel,
                        empSalary,
                        empPhoto: fileGen
                    });
                    resolve(await this.employeeRepository.save(employeeData));
                })
                .on("error", (err) => {
                    console.log(err);
                });
        });
    }

    async update(fileImage: Upload, updateEmployeeDto: UpdateEmployeeDto): Promise<EmployeeSchema> {
        const { id } = updateEmployeeDto;
        const employeeData = await this.employeeRepository.findOneBy({ id });
        if (employeeData) {
            //กรณีอัพเดดรูปใหม่
            if (fileImage !== undefined) {
                await unlink(join(process.cwd(), `./images/${employeeData.empPhoto}`));

                const fileGen = this.generateNewFileName(fileImage);
                employeeData.empPhoto = fileGen;

                fileImage
                    .createReadStream()
                    .pipe(createWriteStream(join(process.cwd(), `images/${fileGen}`)))
                    .on("error", (err) => {
                        console.log(err);
                    });
            }

            Object.assign(employeeData, updateEmployeeDto);
            await this.employeeRepository.update({ id }, employeeData);
            return employeeData;
        }
    }

    async delete(id: number): Promise<Boolean> {
        const employeeData = await this.employeeRepository.findOneBy({ id });
        if (employeeData) {
            await unlink(join(process.cwd(), `./images/${employeeData.empPhoto}`));
            await this.employeeRepository.delete({id});
            return true;
        }
        return false;
    }
}