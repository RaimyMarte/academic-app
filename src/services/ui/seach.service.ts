import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private search = '';
  private currentPage = 1;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.initializeFromRoute();
  }

  private initializeFromRoute(): void {
    this.route.queryParams.subscribe((params) => {
      const search = params['search'] || '';
      this.search = search;

      const page = parseInt(params['page'], 10);
      if (!isNaN(page)) {
        this.currentPage = page;
      }
    });
  }

  getSearchTerm(): string {
    return this.search;
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  private updateRoute(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this.search, page: this.currentPage },
      queryParamsHandling: 'merge', 
    });
  }

  async onSearchEvent(search: string): Promise<void> {
    this.search = search;
    this.currentPage = 1; 
    this.updateRoute();
  }

  async onResetSearch(): Promise<void> {
    this.search = '';
    this.currentPage = 1; 
    this.updateRoute();
  }
}
