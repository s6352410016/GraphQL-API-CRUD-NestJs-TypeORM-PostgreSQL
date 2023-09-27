import { InputType , Field , Int } from '@nestjs/graphql';
import { IsNotEmpty , IsString , IsInt } from 'class-validator';

@InputType()
export class UpdateEmployeeDto{
    @IsNotEmpty()
    @IsInt()
    @Field(() => Int)
    id: number;

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