import { ObjectType , Int , Field } from "@nestjs/graphql";
import { Entity , Column , CreateDateColumn , UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class EmployeeSchema{
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column("varchar")
    @Field()
    empName: string;

    @Column("varchar")
    @Field()
    empAddress: string;

    @Column("varchar")
    @Field()
    empTel: string;

    @Column("integer")
    @Field(() => Int)
    empSalary: number;
    
    @Column("varchar")
    @Field()
    empPhoto: string;

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    @UpdateDateColumn()
    @Field()
    updatedAt: Date;
}