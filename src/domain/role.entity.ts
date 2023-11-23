import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('tb_role')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    name: string;

    @ManyToOne(type => User, user => user.roles)
    @JoinColumn({ name: 'userId' })
    user: User;
}
