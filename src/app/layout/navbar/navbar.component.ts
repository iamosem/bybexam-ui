import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false,
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
  ) {}

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }


  async logout() {
    this.authService.logout();
  }
}
