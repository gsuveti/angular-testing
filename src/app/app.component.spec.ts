import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {AuthService} from './auth.service';

describe('AppComponent', () => {
    let appFixture: ComponentFixture<AppComponent>;
    let appComponent: AppComponent;
    let authService: AuthService;
    let fakeAuthService;

    beforeEach(async(() => {
        // Create a fake AuthService object with a `isAuthenticated()` spy
        fakeAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
        fakeAuthService.isAuthenticated.and.returnValue(false);

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent
            ],
            providers: [
                {provide: AuthService, useValue: fakeAuthService}
            ]
        });

        appFixture = TestBed.createComponent(AppComponent);
        appComponent = appFixture.componentInstance;

        // AuthService provided to the TestBed
        authService = TestBed.inject(AuthService);
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'Angular testing'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('Angular testing');
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.toolbar span').textContent).toContain('Angular testing');
    });

    it('needsLogin should be true when the user has not been authenticated', () => {
        appComponent.ngOnInit();
        expect(appComponent.needsLogin).toBeTruthy();
    });

    it('needsLogin should be false when the user has been authenticated', () => {
        fakeAuthService.isAuthenticated.and.returnValue(true);
        appComponent.ngOnInit();
        expect(appComponent.needsLogin).toBeFalsy();
    });
});
