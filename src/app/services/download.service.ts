import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { API_URL } from '../app.constants';
import { LoginDetails, UserDetails } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class DownloadService {
  private apiUrl = `${API_URL}/download`;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  downloadInspectionReport(orderId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/inspection-report/${orderId}`, { responseType: 'blob', observe: 'response' })
      .pipe(
        map(response => {
          const contentDisposition = response.headers.get('Content-Disposition');
          let filename = 'files.zip';
          if (contentDisposition) {
            const matches = /filename=([^"]+)/.exec(contentDisposition);
            if (matches != null && matches[1]) {
              filename = matches[1];
            }
          }
          return [response.body, filename];
        }),
        map(([response, fileName]) => ([window.URL.createObjectURL(response as Blob), fileName]))
      );
  }
}
