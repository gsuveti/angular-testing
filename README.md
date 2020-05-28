<!-- $theme: default -->
  

# Angular Testing

---

## Unit testing

Also called Isolated testing. It’s the practice of testing <strong>small isolated pieces of code</strong>. If your test uses some external resource, like the network or a database, it’s not a unit test.

---

### Jasmine & Karma

<br>
<strong>Jasmine</strong> is a behavior-driven development framework for testing JavaScript code. It does not depend on any other JavaScript frameworks. It does not require a DOM. And it has a clean, obvious syntax so that you can easily write tests.
<br>
<br>
<strong>Karma</strong> is a simple tool that allows you to execute JavaScript code in multiple real browsers.
The main purpose of Karma is to make your test-driven development easy, fast, and fun.

---


### Jasmine

```
describe('Hello world', () => { (1)
  it('says hello', () => { (2)
    expect(helloWorld()) (3)
        .toEqual('Hello world!'); (4)
  });
});

```

<small>
  
1. The <span style="color:red">describe(string, function)</span> function defines what we call a <span style="color:red">Test Suite</span>, a collection of individual Test Specs.

2. The <span style="color:red">it(string, function)</span> function defines an individual <span style="color:red">Test Spec</span>, this contains one or more Test Expectations.

3. The <span style="color:red">expect(actual)</span> expression is what we call an <span style="color:red">Expectation</span>. In conjunction with a Matcher it describes an expected piece of behaviour in the application.

4. The <span style="color:red">matcher(expected)</span> expression is what we call a <span style="color:red">Matcher</span>. It does a boolean comparison with the expected value passed in vs. the actual value passed to the expect function, if they are false the spec fails.

</small>


---

### Testing Classes & Pipes

```
export class InitCapsPipe implements PipeTransform {

  transform(value: string): string {
    return value.toLowerCase()
        .replace(
            /(?:^|\s)[a-z]/g,
            (m) => m.toUpperCase()
        );
  }
}
```

---

### Testing Classes & Pipes

```
describe('InitCapsPipe', () => {
    let pipe: InitCapsPipe;

    beforeEach(() => {
        pipe = new InitCapsPipe();
    });
    
    it('transforms "lorem ipsum" to "Lorem Ipsum"', () => {
        expect(pipe.transform('lorem ipsum'))
        .toEqual('Lorem Ipsum');
    });
});
```
---

### Testing Classes & Pipes

```
export class AuthService {

    constructor() {
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
}
```

---

### Testing Classes & Pipes


```
describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        service = new AuthService();
    });

    afterEach(() => {
        service = null;
        localStorage.removeItem('token');
    });
});
```

<h3>Setup & Teardown</h3>

We want to run our test specs against fresh instances of AuthService so we use the <span style="color:red">beforeEach</span> and <span style="color:red">afterEach</span> functions to setup and clean instances.

---
# DEMO
---

### Testing with Mocks & Spies

```

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

    it('needsLogin should be false when the user has been authenticated', () => {
        localStorage.setItem('token', '12345');
        component.ngOnInit();
        expect(component.needsLogin).toBeFalsy();
    });
});
```

---

#### Testing with real service

<br>

- In order to test AppComponent we would need to know the inner workings of AuthService. That’s not very isolated.

- What if AuthService will change how it stores the token, from localStorage to cookies?

---

#### Mocking with Fake Classes


```
class MockAuthService extends AuthService {
    authenticated = false;

    isAuthenticated() {
        return this.authenticated;
    }
}
```

---

### Mocking with Spies

A Spy is a feature of Jasmine which lets you take an existing class, function, or object and mock it in such a way that you can control what gets returned from function calls.

```
describe('AppComponent: Testing with spies`', () => {

    beforeEach(() => {
        service = new AuthService();
        component = new AppComponent(service);
    });

    it('needsLogin should be true when the user has not been authenticated', () => {
        spy = spyOn(service, 'isAuthenticated')
        	.and.returnValue(false);
        component.ngOnInit();
        expect(service.isAuthenticated).toHaveBeenCalled();
        expect(component.needsLogin).toBeTruthy();

    });
});
```

---

### Angular Test Bed

```
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
``` 
The TestBed creates a dynamically-constructed Angular test module that emulates an Angular @NgModule.


---
### Angular Test Bed


<br>

```
fakeAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
fakeAuthService.isAuthenticated.and.returnValue(false);
```



Creating a spy object
<br>

```
// AuthService provided to the TestBed
authService = TestBed.inject(AuthService);
```
Injecting the service

---

### Angular Test Bed

```

appFixture = TestBed.createComponent(AppComponent);
appComponent = appFixture.componentInstance;

```

- TestBed.createComponent() creates an instance of the AppComponent, adds a corresponding element to the test-runner DOM, and returns a ComponentFixture.

- The ComponentFixture is a test harness for interacting with the created component and its corresponding element.

- Access the component instance through the fixture and confirm it exists with a Jasmine expectation:

---

### Detect changes
```
it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.toolbar span').textContent)
    	.toContain('Angular testing');
});
```
- createComponent() does not bind data
- You must tell the TestBed to perform data binding by calling fixture.detectChanges(). Only then does the .toolbar .span have the expected title.

---




# DEMO

---

## E2E testing

This is defined as the testing of the <span style="color:red">complete functionality</span> of an application. In practice with web apps, this means interacting with your application as it’s running in a browser just like a user would interact with it in real life, i.e. via clicks on a page.

---

## Protractor vs Cypress

Protractor pros:
- Community
- You can choose test library

Cypress pros:
- Auto-reload
- Automatic waits

---
# DEMO
---

# Oauth2

The OAuth 2.0 authorization framework enables a third-party
application to obtain limited access to an HTTP service, either on
behalf of a resource owner by orchestrating an approval interaction
between the resource owner and the HTTP service, or by allowing the
third-party application to obtain access on its own behalf.

---
# JWT

JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.  The claims in a JWT are encoded as a <span style="color:red">JSON object</span> that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be 
<span style="color:red">digitally signed</span> or integrity protected with a Message Authentication Code (MAC) <span style="color:red">and/or encrypted</span>.
   
---
### Where to store the JWT?

- localStorage
- cookie (secure, httpOnly, SameSite)

---

### How to append the token to requests?

- localStorage: Authorization hearder or custom query param using <span style="color:red">interceptors</span>
- cookies are sent with every request

---

### Create an Interceptor


```
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request);
  }
}
```
---

### Add the Interceptor to Providers


The interceptor needs to be added to the HTTP_INTERCEPTORS array
```
@NgModule({
  bootstrap: [AppComponent],
  imports: [...],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
```

