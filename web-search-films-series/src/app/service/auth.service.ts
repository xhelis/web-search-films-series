import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { IResponseLogin, IbodyLogin } from './entity/login';

@Injectable()
export class AuthServices {
  constructor() {}
  private loginSubscription: ReplaySubject<IResponseLogin> = new ReplaySubject<
    IResponseLogin
  >();

  getResponseLogin(): Observable<IResponseLogin> {
    return this.loginSubscription;
  }

  checkLogin(body: IbodyLogin): void {
    if (body.password === 'pass' && body.username === 'user') {
      this.loginSubscription = new ReplaySubject<IResponseLogin>();
      const token: IResponseLogin = { token: 'Bearer...token1' };
      return this.loginSubscription.next(token);
    } else {
      const err: Error = {
        name: '401',
        message: 'Error with user and password',
      };
      return this.loginSubscription.error(err);
    }
  }
}
