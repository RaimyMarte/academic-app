import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ErrorResponseMessageService {
  constructor(private toastService: MessageService) { }

  handleError(error: any): void {
    this.toastService.add({
      severity: 'error',
      summary: 'Error',
      detail: error?.message || 'Something went wrong',
    });
  }
}
