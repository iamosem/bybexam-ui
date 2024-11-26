import { Component } from '@angular/core';
import { NO_NAVBAR, NO_FOOTER } from './app.constants';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  title = 'bybexam-ui';
  currentUrl: string;

  constructor(
    private router: Router,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  hasNavbar(): boolean {
    return !NO_NAVBAR.some((url) => url.test(this.currentUrl));
  }

  hasFooter(): boolean {
    return !NO_FOOTER.some((url) => url.test(this.currentUrl));
  }
}
