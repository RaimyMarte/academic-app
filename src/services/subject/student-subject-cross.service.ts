import { Injectable } from '@angular/core';
import { Student } from '../../types/student';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';

interface SaveSubjectEnrollmentBody {
    SubjectId: string;
    EnrollStudents: string[];
    NotEnrollStudents: string[];
}

@Injectable({
    providedIn: 'root'
})

export class StudentSubjectCrossService {
    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    async getEnrolledStudents(subjectId: string) {
        const response = await this.apiService.get(`/students_in_subject/${subjectId}`, this.authService.authHeader());
        const data = response?.data as Student[];

        return data
    }

    async getStudentsNotEnrolled(subjectId: string) {
        const response = await this.apiService.get(`/students_out_subject/${subjectId}`, this.authService.authHeader());
        const data = response?.data as Student[];

        return data
    }

    async saveSubjectEnrollment(body: SaveSubjectEnrollmentBody) {
        await this.apiService.post('/save_subject_enrollment', body, this.authService.authHeader());
    }

}
