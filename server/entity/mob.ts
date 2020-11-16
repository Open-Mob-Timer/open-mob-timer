import { Entity, OneToMany, Column } from 'typeorm';
import { User } from './user';
import { BaseEntity } from './base';

@Entity('mob')
export class Mob extends BaseEntity {
    @Column()
    public name: string;

    @OneToMany(type => User, user => user.mob)
    public users: Array<User>;
}
