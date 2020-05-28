import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    needsLogin = true;
    email: string;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.needsLogin = !this.authService.isAuthenticated();
        this.email = this.needsLogin ? '' : this.authService.getEmail();
    }
}
