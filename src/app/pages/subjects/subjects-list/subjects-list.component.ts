import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { SubjectService } from '../../../../services/subject/subject.service';
import { PaginationService } from '../../../../services/ui/pagination.service';
import { SearchService } from '../../../../services/ui/seach.service';
import { PageChangeEvent } from '../../../../types/pageChangeEvent';
import { PaginationQuery } from '../../../../types/paginationQuery';
import { Subject } from '../../../../types/subject';
import { getPageChangeDetails } from '../../../../utils/getPageChangeDetails';
import { SubjectDialogComponent } from '../../../components/subject/subject-dialog/subject-dialog.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-subjects-list',
  standalone: true,
  imports: [TableModule, DialogModule, RouterModule, SubjectDialogComponent, TooltipModule, RippleModule, ButtonModule, ToolbarModule, ConfirmDialogModule, InputTextModule, CommonModule, DropdownModule, TagModule, InputTextModule, FormsModule,],
  providers: [ConfirmationService,],
  templateUrl: './subjects-list.component.html',
  styleUrl: './subjects-list.component.css',
})
export class SubjectsListComponent implements OnInit {
  currentUserRole: number = 0;
  subjectDialog: boolean = false;

  subjects!: Partial<Subject>[];
  subject!: Partial<Subject>;

  totalSubjects: number = 0;
  searchTerm: string = ''

  @ViewChild(SubjectDialogComponent) subjectDialogComponent!: SubjectDialogComponent;

  constructor(private authService: AuthService, private subjectService: SubjectService, private confirmationService: ConfirmationService, public paginationService: PaginationService, private searchService: SearchService) { }

  async ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    this.currentUserRole = currentUser?.UserRoleId || 0
    this.initializeSubjectList()
  }

  async initializeSubjectList() {
    const currentPage = this.paginationService.getCurrentPage();
    const rowsPerPage = this.paginationService.getItemsPerPage();
    this.searchTerm = this.searchService.getSearchTerm();

    // Call loadSubjects to load the data with the current page, page size, and search term
    await this.loadSubjects({ currentPage: currentPage, currentPageSize: rowsPerPage, search: this.searchTerm });
  }

  async loadSubjects({ currentPage, currentPageSize, search }: PaginationQuery) {
    const { subjects, total: totalSubjects } = await this.subjectService.getSubjects({ currentPage, currentPageSize, search });

    this.subjects = subjects
    this.totalSubjects = totalSubjects;
  }

  paginate(event: PageChangeEvent) {
    const { currentPage, rowsPerPage } = getPageChangeDetails(event);

    this.paginationService.onPageEvent(currentPage, rowsPerPage);
    this.loadSubjects({ currentPage, currentPageSize: rowsPerPage, search: this.searchTerm });
  }

  onSearch() {
    this.searchService.onSearchEvent(this.searchTerm);
    const rowsPerPage = this.paginationService.getItemsPerPage();

    this.loadSubjects({ currentPage: 1, currentPageSize: rowsPerPage, search: this.searchTerm });
  }

  onResetSearch() {
    this.searchService.onResetSearch();
    const rowsPerPage = this.paginationService.getItemsPerPage();
    this.searchTerm = ''

    this.loadSubjects({ currentPage: 1, currentPageSize: rowsPerPage, search: '' });
  }

  editSubject(subject: Subject) {
    this.subjectDialogComponent.editSubject(subject)
  }

  openNew() {
    this.subjectDialogComponent.openNew()
  }

  deleteSubject(subject: Subject) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + subject?.Name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: "p-button-primary",
      rejectButtonStyleClass: "p-button-secondary p-button-text",
      accept: () => {
        this.subjectService.deleteSubject(subject?.Id);
        this.initializeSubjectList()
        this.subject = {};
      }
    });
  }
}