import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService:AuthService, private router :Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const isAuth = this.authService.getIsAuth();

    if(!isAuth){

      this.router.navigate(['/login']);

    }
    return isAuth;
  }






}





