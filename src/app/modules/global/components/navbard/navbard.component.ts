import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbard',
  templateUrl: './navbard.component.html',
  styleUrls: ['./navbard.component.css']
})
export class NavbardComponent {
  constructor(private authService: AuthService, private router: Router) { }

  menuVisible = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');  
  }

}
