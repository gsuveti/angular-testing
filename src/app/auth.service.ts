export class AuthService {

    constructor() {
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
}
