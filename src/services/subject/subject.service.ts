import { Injectable } from '@angular/core';
import { Subject } from '../../types/subject';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { PaginationQuery } from '../../types/paginationQuery';

interface SubjectBody {
    Code?: string | null;
    Name: string;
    Description?: string | null;
    Enabled: boolean;
    StatusId: number;
    StartDate: string;
    ProfessorId?: string | null,
    EndDate: string;
}

@Injectable({
    providedIn: 'root'
})

export class SubjectService {
    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    async getSubjects({ currentPage, currentPageSize, search }: PaginationQuery) {
        const response = await this.apiService.get(`/subject_get_all?page=${currentPage}&pageSize=${currentPageSize}&search=${search}`, this.authService.authHeader());
        const subjects = response?.data as Subject[];

        return {
            subjects,
            total: response?.total
        };
    }

    async createSubject(body: SubjectBody) {
        await this.apiService.post('/create_subject', body, this.authService.authHeader());
    }

    async updateSubject({ body, subjectId }: { body: SubjectBody, subjectId: string }) {
        await this.apiService.patch(`/update_subject/${subjectId}`, body, this.authService.authHeader());
    }
}
