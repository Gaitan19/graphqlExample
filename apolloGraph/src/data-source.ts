import "reflect-metadata"
import { DataSource } from "typeorm"
import { Invoice } from "./entity/invoice.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "admin",
    database: "graphdb",
    synchronize: true,
    logging: false,
    entities: [Invoice],
    migrations: [],
    subscribers: [],
})
