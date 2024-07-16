
export interface IUser  {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    token: string;
    profilePic: string;
    createdAt: Date; 
    updatedAt: Date; 
}