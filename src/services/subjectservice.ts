import { Injectable } from '@angular/core';

@Injectable()
export class SubjectService {
    getSubjectsData() {
        return [
            {
                "Id": "1A2B3C4D-5678-9101-1121-314151617181",
                "Code": "MATH101",
                "Name": "Mathematics I",
                "Description": "Introduction to basic algebra and calculus.",
                "Enabled": true,
                "StatusId": 1,
                "StartDate": "2024-01-15T00:00:00Z",
                "ProfessorId": "12345ABC-6789-DEFA-BC12-34567DEF890A",
                "EndDate": "2024-05-15T00:00:00Z",
                "CreatedBy": "AdminUser",
                "CreatedDate": "2024-01-01T10:00:00Z",
                "LastUpdatedBy": "AdminUser",
                "LastUpdatedDate": "2024-01-10T15:00:00Z"
            },
            {
                "Id": "2B3C4D5E-6789-1011-2131-415161718192",
                "Code": "PHYS101",
                "Name": "Physics I",
                "Description": "Fundamentals of mechanics and thermodynamics.",
                "Enabled": true,
                "StatusId": 1,
                "StartDate": "2024-01-15T00:00:00Z",
                "ProfessorId": "22345DEF-6789-ABCD-EF12-34567ABC890B",
                "EndDate": "2024-05-15T00:00:00Z",
                "CreatedBy": "AdminUser",
                "CreatedDate": "2024-01-01T11:00:00Z",
                "LastUpdatedBy": "AdminUser",
                "LastUpdatedDate": "2024-01-11T16:00:00Z"
            },
            {
                "Id": "3C4D5E6F-7890-1121-3141-516171819203",
                "Code": "CHEM101",
                "Name": "Chemistry I",
                "Description": "Basic principles of inorganic and organic chemistry.",
                "Enabled": true,
                "StatusId": 1,
                "StartDate": "2024-01-15T00:00:00Z",
                "ProfessorId": "32345GHI-6789-JKLM-NO12-34567PQR890C",
                "EndDate": "2024-05-15T00:00:00Z",
                "CreatedBy": "AdminUser",
                "CreatedDate": "2024-01-01T12:00:00Z",
                "LastUpdatedBy": "AdminUser",
                "LastUpdatedDate": "2024-01-12T17:00:00Z"
            },
            {
                "Id": "4D5E6F7G-8901-2131-4151-617181920304",
                "Code": "BIO101",
                "Name": "Biology I",
                "Description": "Introduction to cell biology and genetics.",
                "Enabled": true,
                "StatusId": 1,
                "StartDate": "2024-01-15T00:00:00Z",
                "ProfessorId": "42345RST-6789-UVWX-YZ12-34567LMN890D",
                "EndDate": "2024-05-15T00:00:00Z",
                "CreatedBy": "AdminUser",
                "CreatedDate": "2024-01-01T13:00:00Z",
                "LastUpdatedBy": "AdminUser",
                "LastUpdatedDate": "2024-01-13T18:00:00Z"
            },
            {
                "Id": "5E6F7G8H-9012-3141-5161-718192030405",
                "Code": "ENG101",
                "Name": "English I",
                "Description": "Basic grammar, vocabulary, and writing skills.",
                "Enabled": true,
                "StatusId": 1,
                "StartDate": "2024-01-15T00:00:00Z",
                "ProfessorId": "52345UVW-6789-XYZA-BC12-34567RST890E",
                "EndDate": "2024-05-15T00:00:00Z",
                "CreatedBy": "AdminUser",
                "CreatedDate": "2024-01-01T14:00:00Z",
                "LastUpdatedBy": "AdminUser",
                "LastUpdatedDate": "2024-01-14T19:00:00Z"
            },
            {
                "Id": "6F7G8H9I-0123-4151-6171-819203040506",
                "Code": "HIST101",
                "Name": "World History I",
                "Description": "An overview of ancient civilizations and world events.",
                "Enabled": true,
                "StatusId": 1,
                "StartDate": "2024-01-15T00:00:00Z",
                "ProfessorId": "62345XYZ-6789-ABCD-EF12-34567UVW890F",
                "EndDate": "2024-05-15T00:00:00Z",
                "CreatedBy": "AdminUser",
                "CreatedDate": "2024-01-01T15:00:00Z",
                "LastUpdatedBy": "AdminUser",
                "LastUpdatedDate": "2024-01-15T20:00:00Z"
            },
            {
                "Id": "7G8H9I0J-1234-5161-7181-920304050607",
                "Code": "COMP101",
                "Name": "Computer Science I",
                "Description": "Introduction to programming and algorithms.",
                "Enabled": true,
                "StatusId": 1,
                "StartDate": "2024-01-15T00:00:00Z",
                "ProfessorId": "72345ABC-6789-DEFA-BC12-34567GHI890G",
                "EndDate": "2024-05-15T00:00:00Z",
                "CreatedBy": "AdminUser",
                "CreatedDate": "2024-01-01T16:00:00Z",
                "LastUpdatedBy": "AdminUser",
                "LastUpdatedDate": "2024-01-16T21:00:00Z"
            },
            {
                "Id": "8H9I0J1K-2345-6171-8192-030405060708",
                "Code": "PHIL101",
                "Name": "Philosophy I",
                "Description": "Introduction to philosophy and critical thinking.",
                "Enabled": true,
                "StatusId": 1,
                "StartDate": "2024-01-15T00:00:00Z",
                "ProfessorId": "82345DEF-6789-ABCD-EF12-34567JKL890H",
                "EndDate": "2024-05-15T00:00:00Z",
                "CreatedBy": "AdminUser",
                "CreatedDate": "2024-01-01T17:00:00Z",
                "LastUpdatedBy": "AdminUser",
                "LastUpdatedDate": "2024-01-17T22:00:00Z"
            },
            {
                "Id": "9I0J1K2L-3456-7181-9203-040506070809",
                "Code": "ART101",
                "Name": "Art History I",
                "Description": "An introduction to art history and major art movements.",
                "Enabled": true,
                "StatusId": 1,
                "StartDate": "2024-01-15T00:00:00Z",
                "ProfessorId": "92345GHI-6789-JKLM-NO12-34567XYZ890I",
                "EndDate": "2024-05-15T00:00:00Z",
                "CreatedBy": "AdminUser",
                "CreatedDate": "2024-01-01T18:00:00Z",
                "LastUpdatedBy": "AdminUser",
                "LastUpdatedDate": "2024-01-18T23:00:00Z"
            },
            {
                "Id": "0J1K2L3M-4567-8192-0304-050607080910",
                "Code": "MUS101",
                "Name": "Music Theory I",
                "Description": "Basics of music theory and composition.",
                "Enabled": true,
                "StatusId": 1,
                "StartDate": "2024-01-15T00:00:00Z",
                "ProfessorId": "A2345UVW-6789-XYZA-BC12-34567RST890J",
                "EndDate": "2024-05-15T00:00:00Z",
                "CreatedBy": "AdminUser",
                "CreatedDate": "2024-01-01T19:00:00Z",
                "LastUpdatedBy": "AdminUser",
                "LastUpdatedDate": "2024-01-19T24:00:00Z"
            }
        ]
            ;
    }


    getSubjects() {
        return Promise.resolve(this.getSubjectsData());
    }
};