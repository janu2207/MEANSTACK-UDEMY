import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthData} from './auth-data.model'
import { Subject } from 'rxjs';
@Injectable({
  providedIn:"root"
})
export class AuthService{
  private token : string ;
  isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http:HttpClient){}

  getToken():string{
    return this.token;

  }

 createUser(email:string, password:string){
  const authData :AuthData ={email:email, password:password};
  this.http.post("http://localhost:3000/api/user/signup",authData)
  .subscribe(response=>{

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
   this.http.post<{token:string}>("http://localhost:3000/api/user/login",authData)
   .subscribe(response =>{
    const token = response.token;
    this.token= token;
    if(token){
      this.authStatusListener.next(true);
      this.isAuthenticated = true;
    }

  });
 }

 logout(){
   this.token = null;
   this.isAuthenticated = false;
   this.authStatusListener.next(false);
 }
}
