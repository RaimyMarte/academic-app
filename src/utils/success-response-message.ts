import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../types/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class SuccessResponseMessageService {
  constructor(private toastService: MessageService) {}

  showSuccess(response: ApiResponse): void {
    this.toastService.add({
      severity: 'success',
      summary: response.title,
      detail: response.message,
    });
  }
}
