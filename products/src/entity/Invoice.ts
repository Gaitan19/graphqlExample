import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InvoiceDetails } from "./InvoiceDetails";

@Entity()
export class Invoice {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    total: number

    @Column()
    client: string

    @OneToMany(() => InvoiceDetails, (invoiceDetail) => invoiceDetail.invoice)
    invoiceDetails: InvoiceDetails[]
}