import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DownloadService } from '../services/download.service';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private downloadService: DownloadService,
    private loadingService: LoadingService,
  ) {}

  get isLoading(): boolean {
    return this.loadingService.isLoading;
  }

  get shouldShowDownloadButton() {
    return this.authService.isLoggedIn();
  }

  downloadInspectionReport(orderId: number) {
    this.loadingService.setAppLoading(true);
    this.downloadService.downloadInspectionReport(orderId)
    .pipe(
      finalize(() => this.loadingService.setAppLoading(false))
    )
    .subscribe({
      next: ([url, fileName]) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
    });
  }
}
