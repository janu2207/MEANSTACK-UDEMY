import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthData} from './auth-data.model';
import { Subject } from 'rxjs';
import { Router} from '@angular/router';
@Injectable({
  providedIn:"root"
})
export class AuthService{
  private token : string ;
  isAuthenticated = false;
  private tokenTimer :any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http:HttpClient, private router :Router){}

  getToken():string{
    return this.token;

  }

 createUser(email:string, password:string){
  const authData :AuthData ={email:email, password:password};
  this.http.post("http://localhost:3000/api/user/signup",authData)
  .subscribe(response =>{

  })

 }

 getAuthStatusListener(){
   return this.authStatusListener.asObservable();
 }

 getIsAuth(){
   return this.isAuthenticated;
 }

 login(email, password){
   console.log(email);
   const authData:AuthData ={email:email,password:password};
   this.http.post<{token:string, expiresIn :number}>("http://localhost:3000/api/user/login",authData)
   .subscribe(response =>{
    const token = response.token;
    this.token= token;
    if(token){
      const expiresInD = response.expiresIn;
      this.setAuthTimer(expiresInD);
      this.authStatusListener.next(true);
      this.isAuthenticated = true;
      const now = new Date();
      const expirationDate = new Date(now.getTime()+expiresInD*1000);
      this.saveAuthData(token,expirationDate);

      this.router.navigate(['/']);
    }

  });
 }

 private setAuthTimer(duration :number){
  this.tokenTimer = setTimeout(() => {
    this.logout();

  },duration*1000);

 }

 autoAuthUser(){
   const authInformation = this.getAuthData();
   if(!authInformation){
     return ;
   }
   const now = new Date();
   const expiresIn = authInformation.expirationDate.getTime()-now.getTime();
   console.log(authInformation);
   console.log(expiresIn);
   if(expiresIn>0){
     this.token = authInformation.token;
     this.isAuthenticated = true;
     this.setAuthTimer(expiresIn / 1000);
     this.authStatusListener.next(true);

   }

 }

 logout(){
   this.token = null;
   this.isAuthenticated = false;
   this.authStatusListener.next(false);
   this.router.navigate(['/']);
   clearTimeout(this.tokenTimer);
   this.clearAuthData();
 }

 private saveAuthData(token:string, expirationDate:Date){
   localStorage.setItem('token',token);
   localStorage.setItem('expiration',expirationDate.toISOString());



 }

 private clearAuthData(){
   localStorage.removeItem("token");
   localStorage.removeItem("expiration");

 }

 private getAuthData(){
   const token = localStorage.getItem("token");
   const expirationDate = localStorage.getItem("expiration");
   if(!token|| !expirationDate){
     return;
   }
   return {
     token:token,
     expirationDate : new Date(expirationDate)
   }
 }
}
