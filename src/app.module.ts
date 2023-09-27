import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig , ApolloDriver } from '@nestjs/apollo';
import {join} from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeSchema } from './employee/schema/employee.schema';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd() , "src/employee/schema.gql")
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "5087",
      database: "graphql_api_crud_nestjs_db",
      entities: [EmployeeSchema],
      synchronize: true
    }),
    EmployeeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
