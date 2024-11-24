import { Injectable } from '@angular/core';
import { Subject } from '../../types/subject';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { PaginationQuery } from '../../types/paginationQuery';
import { StudentSubjectCross } from '../../types/studentSubjectCross';

// interface SubjectBody {
//     Code?: string | null;
//     Name: string;
//     Description?: string | null;
//     Enabled: boolean;
//     StatusId: number;
//     StartDate: string;
//     ProfessorId?: string | null,
//     EndDate: string;
// }

@Injectable({
    providedIn: 'root'
})

export class StudentSubjectCrossService {
    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    async getEnrolledStudents(studentId: string) {
        const response = await this.apiService.get(`/students_in_subject/${studentId}`, this.authService.authHeader());
        const data = response?.data as StudentSubjectCross[];

        return data
    }

    async getStudentsNotEnrolled(studentId: string) {
        const response = await this.apiService.get(`/students_out_subject/${studentId}`, this.authService.authHeader());
        const data = response?.data as StudentSubjectCross[];

        return data
    }

    async saveSubjectEnrollment(body: any) {
        await this.apiService.post('/save_subject_enrollment', body, this.authService.authHeader());
    }

}
