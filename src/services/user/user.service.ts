import { Injectable } from '@angular/core';
import { User } from '../../types/user';
import { ApiService } from '../api.service';
import { AuthService } from '../auth/auth.service';

interface CreateUserBody {
    Email: string
    FirstName: string
    LastName: string
    Phone: string
    ChangePwdNextLogin: boolean
    AutomaticPassword: boolean
    Password: string
    ConfirmPassword: string
    UserRoleId: number
}

interface UpdateUserBody {
    Email: string
    FirstName: string
    LastName: string
    UserName: string
    UserId: string
}

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    async getUsers() {
        const response = await this.apiService.get('/get_users', this.authService.authHeader());
        const users = response?.data as User[];
        return users;
    }

    async getUserById(userId: string) {
        const response = await this.apiService.get(`/get_user/${userId}`, this.authService.authHeader());
        const user = response?.data as User;

        return user;
    }

    async createUser(body: CreateUserBody) {
        await this.apiService.post('/create_user', body, this.authService.authHeader());
    }


    async updateUser(body: UpdateUserBody) {
        await this.apiService.patch('/update_user', body, this.authService.authHeader());
    }
}
