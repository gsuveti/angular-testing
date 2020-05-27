import {AppComponent} from './app.component';
import {AuthService} from './auth.service';


xdescribe('AppComponent: Testing with spies`', () => {
    let component: AppComponent;
    let service: AuthService;
    let spy: any;

    beforeEach(() => {
        service = new AuthService();
        component = new AppComponent(service);
    });

    afterEach(() => {
        service = null;
        component = null;
    });


    it('needsLogin should be true when the user has not been authenticated', () => {
        spy = spyOn(service, 'isAuthenticated').and.returnValue(false);
        component.ngOnInit();
        expect(service.isAuthenticated).toHaveBeenCalled();
        expect(component.needsLogin).toBeTruthy();

    });

    it('needsLogin should be false when the user has been authenticated', () => {
        spy = spyOn(service, 'isAuthenticated').and.returnValue(true);
        component.ngOnInit();
        expect(service.isAuthenticated).toHaveBeenCalled();
        expect(component.needsLogin).toBeFalsy();
    });
});
