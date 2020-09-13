// tslint:disable: no-string-literal
import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';

describe('LoginComponent', () => {
  let login: LoginComponent;
  beforeEach(() => {
    login = new LoginComponent(
      {
        // tslint:disable-next-line: object-literal-key-quotes
        checkLogin: () => of({ token: 'bearer' }),
        getResponseLogin: () => of({ token: 'bearer' }),
      } as any,
      { navigate: () => of(jasmine.createSpy()) } as any
    );
  });

  it('ngOnInit', () => {
    login.ngOnInit();
    expect(login.isError).toBeFalse();
    expect(login.form.value.username).toEqual('');
    expect(login.form.value.password).toEqual('');
  });

  it('login succesful', () => {
    const formBuilder: FormBuilder = new FormBuilder();
    login.form = formBuilder.group({
      username: 'user',
      password: 'pass',
    });

    login.Login();
    expect(localStorage.getItem('token')).toBe('bearer');
  });

  it('login error', () => {
    try {
      const formBuilder: FormBuilder = new FormBuilder();
      login.form = formBuilder.group({
        username: 'a',
        password: 'b',
      });
      spyOn(login['authServices'], 'getResponseLogin').and.returnValue(
        throwError('err')
      );
      login.Login();
    } catch (err) {
      expect(login.isError).toBeTrue();
    }
  });
});
