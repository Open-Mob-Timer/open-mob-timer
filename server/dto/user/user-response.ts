export interface UserResponse {
    id: string;
    mobId: string;
    name: string;
    isAway: boolean;
    turnEndsAt?: Date;
}
