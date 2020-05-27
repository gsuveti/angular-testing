import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {AuthService} from './auth.service';
import {By} from '@angular/platform-browser';

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

        // UserService provided to the TestBed
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

        appFixture.detectChanges();

        const el = appFixture.debugElement.query(By.css('a'));
        expect(el).toBeTruthy();
        expect(el.nativeElement.textContent.trim()).toBe('Login');
    });

    it('needsLogin should be false when the user has been authenticated', () => {
        fakeAuthService.isAuthenticated.and.returnValue(true);
        appComponent.ngOnInit();
        expect(appComponent.needsLogin).toBeFalsy();

        appFixture.detectChanges();

        const el = appFixture.debugElement.query(By.css('a'));
        expect(el).toBeFalsy();
    });
});
