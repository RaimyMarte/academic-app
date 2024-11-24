import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private currentPage = 1;
  private itemsPerPage = 10;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.initializeFromRoute();
  }

  private initializeFromRoute(): void {
    this.route.queryParams.subscribe((params) => {
      const page = parseInt(params['page'], 10);
      if (!isNaN(page)) {
        this.currentPage = page;
      }
    });
  }

  getCurrentPage(): number {
    return this.currentPage || 1;
  }

  getItemsPerPage(): number {
    return this.itemsPerPage || 10;
  }


  private updateRoute(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage, pageSize: this.itemsPerPage },
      queryParamsHandling: 'merge',
    });
  }

  async onPageEvent(currentPage: number, rowsPerPage: number) {
    this.currentPage = currentPage;
    this.itemsPerPage = rowsPerPage;
    this.updateRoute();
  }
}

