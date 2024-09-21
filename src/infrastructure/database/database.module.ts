import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { entities } from "../../domain/_index";
import * as dotenv from "dotenv";
dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: `${process.env.DB_HOST}`,
            port: Number(process.env.DB_PORT),
            username: `${process.env.DB_USER}`,
            password: `${process.env.DB_PASSWORD}`,
            database: `${process.env.DB_NAME}`,
            autoLoadEntities: true,
            synchronize: true,
        }),
        TypeOrmModule.forFeature(entities)
    ]
})
export class DatabaseModule { }
