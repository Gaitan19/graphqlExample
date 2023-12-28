import { ColumnNumericTransformer } from "../utils/columnNumericTransformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sellerName: string;

    @Column()
    customerName: string;

    @Column()
    date: Date;

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        transformer: new ColumnNumericTransformer()
    })
    total: number;
}
