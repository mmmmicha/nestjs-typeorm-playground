import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_cat')
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    breed: string;

    @Column({ default: true })
    isActive: boolean;
}