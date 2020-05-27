import {AuthService} from './auth.service';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        service = new AuthService();
    });

    afterEach(() => {
        service = null;
        localStorage.removeItem('token');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return true from isAuthenticated when there is a token', () => {
    });

    it('should return false from isAuthenticated when there is no token', () => {
    });

});
