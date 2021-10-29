import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  
  constructor(private router: Router) {}
  canActivate() {
    console.log('local::::', localStorage.getItem('user'));
    if(localStorage.getItem('user') != null && localStorage.getItem('user') != undefined){
      return true;
    }    
    this.router.navigate(['/login']);
    return false;
  }
}
