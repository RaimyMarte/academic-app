import { Injectable } from '@angular/core';
import { Maintenance } from '../../types/maintenance';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class MaintenanceService {
    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    async getSelectedMaintenances(selectedMaintenances: string[]) {
        const response = await this.apiService.post('/get_all_selected_maintenances', { selectedMaintenances }, this.authService.authHeader());

        const maintenaces = response?.data;

        return maintenaces;
    }
}