import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Category } from "./Category";
import { InvoiceDetails } from "./InvoiceDetails";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @ManyToOne(() => Category, (category) => category.products, {onDelete: 'CASCADE'})
    category: Category

    @OneToOne(() => InvoiceDetails)
    @JoinColumn()
    invoiceDetails: InvoiceDetails
}