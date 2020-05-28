import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private httpClient: HttpClient, private router: Router) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    ngOnInit(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }

    login() {
        if (this.loginForm.valid) {
            const {email, password} = this.loginForm.getRawValue();
            this.httpClient.post<{ token: string }>('https://reqres.in/api/login', {email, password})
                .pipe(
                    tap(response => localStorage.setItem('token', response.token)),
                    tap(_ => localStorage.setItem('email', email)),
                    tap(_ => this.router.navigate(['']))
                )
                .subscribe();
        }
    }
}
