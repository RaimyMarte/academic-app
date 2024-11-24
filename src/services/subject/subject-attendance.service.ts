import { Injectable } from '@angular/core';
import { Student } from '../../types/student';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';

interface GetSubjectAttendance {
    presentStudents: Student[];
    absentStudents: Student[];
}

interface SaveSubjectAttendance {
    Date: string;
    SubjectId: string;
    PresentStudents: string[];
    AbsentStudents: string[];
}

@Injectable({
    providedIn: 'root'
})

export class SubjectAttendanceService {
    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    async getSubjectAttendance(subjectId: string, date: string) {
        const response = await this.apiService.get(`/subject_get_attendance/${subjectId}?date=${date}`, this.authService.authHeader());
        const data = response?.data as GetSubjectAttendance[];

        return data
    }

    async saveSubjectAttendance(body: SaveSubjectAttendance) {
        await this.apiService.post('/save_subject_attendance', body, this.authService.authHeader());
    }

}
