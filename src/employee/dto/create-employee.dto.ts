import { InputType , Field , Int } from '@nestjs/graphql';
import { IsNotEmpty , IsString , IsInt } from 'class-validator';

@InputType()
export class CreateEmployeeDto{
    @IsNotEmpty()
    @IsString()
    @Field()
    empName: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    empAddress: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    empTel: string;

    @IsNotEmpty()
    @IsInt()
    @Field(() => Int)
    empSalary: number;
}