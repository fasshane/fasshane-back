export class CreationUserResponse {
    userId: string;
    email: string;
    name: string;
    role: string;

    constructor(data: { userId: string, email: string, name: string, role: string }) {
        this.userId = data.userId;
        this.email = data.email;
        this.name = data.name;
        this.role = data.role;
    }
}