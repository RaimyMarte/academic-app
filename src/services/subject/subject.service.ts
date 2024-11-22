import { Injectable } from '@angular/core';
import { Subject } from '../../types/subject';
import { ApiService } from '../api.service';
import { AuthService } from '../auth/auth.service';

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

    async getSubjects() {
        const response = await this.apiService.get('/subject_get_all', this.authService.authHeader());
        const subjects = response?.data as Subject[];
     
        return subjects;
    }

    async createSubject(body: SubjectBody) {
        await this.apiService.post('/create_subject', body, this.authService.authHeader());
    }

    async updateSubject({ body, subjectId }: { body: SubjectBody, subjectId: string }) {
        await this.apiService.patch(`/update_subject/${subjectId}`, body, this.authService.authHeader());
    }
}
