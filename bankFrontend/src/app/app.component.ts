import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './core/services/login/login.service';
import { Router , NavigationEnd, Event} from '@angular/router';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BankFrontend';
  showElements: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient, private loginService:LoginService) {}

  ngOnInit(): void {
  this.router.events
  .pipe(
    filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
  )
  .subscribe((event: NavigationEnd) => {
    const url = event.urlAfterRedirects;
    this.showElements = !(
      url === '/login' ||
      url === '/register' ||
      url === '/admin/addUser' ||
      url.match(/^\/admin\/edit-user\/\w+$/) || 
      this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'not-found' // Check for Page Not Found route
    );
  });
    
  }
}

