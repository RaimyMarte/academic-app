import { Injectable } from '@angular/core';
import { Student } from '../../types/student';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { PaginationQuery } from '../../types/paginationQuery';

interface StudentBody {
    Code?: string | null;
    FirstName: string;
    LastName: string;
    Address?: string | null;
    DateOfBirth: string;
    Gender?: string | null;
    EmailAddress?: string | null;
    PhoneNumber?: string | null;
    ParentName?: string | null;
    ParentPhoneNumber?: string | null;
}

@Injectable({
    providedIn: 'root'
})

export class StudentService {
    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }


    async getStudents({ currentPage, currentPageSize, search }: PaginationQuery) {
        const response = await this.apiService.get(`/student_get_all?page=${currentPage}&pageSize=${currentPageSize}&search=${search}`, this.authService.authHeader());
        const students = response?.data as Student[];

        return {
            students,
            total: response?.total
        };
    }

    async getStudentsDropdown() {
        const response = await this.apiService.get('/student_dropdown', this.authService.authHeader());
        const students = response?.data as Student[];

        return students;
    }

    async getStudentById(studentId: string) {
        const response = await this.apiService.get(`/student_by_id/${studentId}`, this.authService.authHeader());
        const student = response?.data as Student;

        return student;
    }

    async createStudent(body: StudentBody) {
        await this.apiService.post('/create_student', body, this.authService.authHeader());
    }

    async updateStudent({ body, studentId }: { body: StudentBody, studentId: string }) {
        await this.apiService.patch(`/update_student/${studentId}`, body, this.authService.authHeader());
    }

    async deleteStudent(studentId: string) {
        await this.apiService.delete(`/delete_student/${studentId}`, this.authService.authHeader());
    }
}
