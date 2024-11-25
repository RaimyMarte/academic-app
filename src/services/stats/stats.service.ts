import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class StatsService {
    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    async getAdminStats() {
        const response = await this.apiService.get(`/get_admin_stats`, this.authService.authHeader());
        const data = response?.data;

        return data;
    }

    async getProfessorStats() {
        const response = await this.apiService.get(`/get_professor_stats`, this.authService.authHeader());
        const data = response?.data;

        return data;
    }
}
