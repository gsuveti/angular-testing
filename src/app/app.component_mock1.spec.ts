import {AppComponent} from './app.component';
import {AuthService} from './auth.service';


class MockAuthService extends AuthService {
    authenticated = false;

    isAuthenticated() {
        return this.authenticated;
    }
}


describe('AppComponent: Mocking by overriding functions', () => {
    let component: AppComponent;
    let service: MockAuthService;

    beforeEach(() => {
        service = new MockAuthService();
        component = new AppComponent(service);
    });

    afterEach(() => {
        service = null;
        component = null;
    });


    it('needsLogin should be true when the user has not been authenticated', () => {
        service.authenticated = false;
        component.ngOnInit();
        expect(component.needsLogin).toBeTruthy();
    });

    it('needsLogin should be false when the user has been authenticated', () => {
        service.authenticated = true;
        component.ngOnInit();
        expect(component.needsLogin).toBeFalsy();
    });
});
