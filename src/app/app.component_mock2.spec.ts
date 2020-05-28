import {AppComponent} from './app.component';
import {AuthService} from './auth.service';


describe('AppComponent: Testing with the real `AuthService`', () => {

    let component: AppComponent;
    let service: AuthService;

    beforeEach(() => {
        service = new AuthService();
        component = new AppComponent(service);
    });

    afterEach(() => {
        localStorage.removeItem('token');
        service = null;
        component = null;
    });

    it('needsLogin should be true when the user has not been authenticated', () => {
        component.ngOnInit();
        expect(component.needsLogin).toBeTruthy();
    });

    it('needsLogin should be false when the user has been authenticated', () => {
        localStorage.setItem('token', '12345');
        component.ngOnInit();
        expect(component.needsLogin).toBeFalsy();
    });
});
