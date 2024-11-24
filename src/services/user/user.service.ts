import { Injectable } from '@angular/core';
import { User } from '../../types/user';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api/api.service';
import { PaginationQuery } from '../../types/paginationQuery';

// interface CreateUserBody {
//     Email: string
//     FirstName: string
//     LastName: string
//     Phone: string
//     ChangePwdNextLogin: boolean
//     AutomaticPassword: boolean
//     Password: string
//     ConfirmPassword: string
//     UserRoleId: number
// }

// interface UpdateUserBody {
//     Email: string
//     FirstName: string
//     LastName: string
//     UserName: string
//     UserId: string
// }

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    async getUsers({ currentPage, currentPageSize, search }: PaginationQuery) {
        const response = await this.apiService.get(`/get_users?page=${currentPage}&pageSize=${currentPageSize}&search=${search}`, this.authService.authHeader());
        const users = response?.data as User[];

        return {
            users,
            total: response?.total
        };
    }

    async getProfessors() {
        const response = await this.apiService.get('/get_professors', this.authService.authHeader());
        const professors = response?.data as User[];
        return professors;
    }

    async getUserById(userId: string) {
        const response = await this.apiService.get(`/get_user/${userId}`, this.authService.authHeader());
        const user = response?.data as User;

        return user;
    }

    async createUser(body: any) {
        await this.apiService.post('/create_user', body, this.authService.authHeader());
    }


    async updateUser(body: any) {
        await this.apiService.patch('/update_user', body, this.authService.authHeader());
    }

    async adminResetPassword(body: any) {
        const response = await this.apiService.post('/auth/admin_reset_password', body, this.authService.authHeader());
        const data = response?.data;

        return data;
    }

}
