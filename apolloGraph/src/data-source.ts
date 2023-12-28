import "reflect-metadata"
import { DataSource } from "typeorm"
import { Invoice } from "./entity/invoice.entity"
import { Customer } from "./entity/customer.entity"
import { Seller } from "./entity/seller.entity"
import { Product } from "./entity/product.entity"
import { InvoiceDetail } from "./entity/invoiceDetail.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "graphdb",
    synchronize: true,
    logging: false,
    entities: [Invoice,Customer,Seller,Product,InvoiceDetail],
    migrations: [],
    subscribers: [],
})
