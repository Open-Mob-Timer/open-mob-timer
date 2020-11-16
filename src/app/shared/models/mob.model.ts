import { User } from './user.model';

export interface Mob {
    id?: string;
    name: string;
    users?: Array<User>
}   
