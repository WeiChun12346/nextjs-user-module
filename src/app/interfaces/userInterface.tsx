export interface UserFormData {
    name: string;
    email: string;
    dateOfBirth: Date | null;
    password?: string
}