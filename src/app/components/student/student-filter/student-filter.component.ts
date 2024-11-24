import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { MaintenanceService } from '../../../../services/maintenance/maintenance.service';
import { StudentService } from '../../../../services/student/student.service';
import { Maintenance } from '../../../../types/maintenance';
import { Student } from '../../../../types/student';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-student-filter',
  standalone: true,
  imports: [ReactiveFormsModule, SidebarModule, RippleModule, InputNumberModule, ButtonModule, InputTextModule, CommonModule, DropdownModule, FormsModule,],
  templateUrl: './student-filter.component.html',
  styleUrl: './student-filter.component.css'
})
export class StudentFilterComponent {
  studentFilterSidebar: boolean = false;

  genderOptions = [
    { Id: 'M', Name: 'Male' },
    { Id: 'F', Name: 'Female' },
    { Id: 'U', Name: 'Unknown' },
  ];

  @Input() student: Partial<Student> = {};
  @Input() initializeStudentList!: () => void;

  studentFilterForm = signal<FormGroup>(
    new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      minAge: new FormControl(),
      maxAge: new FormControl(),
      gender: new FormControl(''),
      nationalityId: new FormControl(''),
      createdBefore: new FormControl(''),
      createdAfter: new FormControl(''),
      emailAddress: new FormControl(''),
      phoneNumber: new FormControl(''),
      code: new FormControl(''),
      parentName: new FormControl(''),
    })
  )

  submitted: boolean = false;
  nationalities: Maintenance[] = []

  constructor(private maintenanceService: MaintenanceService,) { }

  async ngOnInit() {
    const selectedMaintenances = ['Nationality']
    const data = await this.maintenanceService.getSelectedMaintenances(selectedMaintenances);
    this.nationalities = data?.Nationality
  }

  openFilterSidebar() {
    this.studentFilterSidebar = true;
  }

  resetFilter() {
    this.studentFilterForm().reset();
    this.studentFilterSidebar = true;
  }


  // this.studentFilterForm().patchValue({
  //   FirstName: student.FirstName || '',
  //   LastName: student.LastName || '',
  //   Code: student.Code || '',
  //   DateOfBirth: student.DateOfBirth || '',
  //   Address: student.Address,
  //   NationalityId: student.NationalityId || null,
  //   Gender: student.Gender || null,
  //   PhoneNumber: student.PhoneNumber || '',
  //   EmailAddress: student.EmailAddress || '',
  // });


  hideFilterSidebar() {
    this.studentFilterSidebar = false;
    this.submitted = false;
  }

  applyFilter() {
    this.submitted = true;

    if (this.studentFilterForm().valid) {
      const formData = this.studentFilterForm().value

      console.log(formData)

      // this.initializeStudentList()
      // this.hideFilterSidebar()
    }
  }
}