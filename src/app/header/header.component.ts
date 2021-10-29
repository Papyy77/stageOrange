import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ShowUserMenu = false;
  @Output()
  event = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  home() {
    this.event.emit('init');
    this.router.navigate(['/quiz']);
  }
  
  showMenu() {
    if(this.ShowUserMenu == false){
      this.ShowUserMenu=true;
    }
    else{
      this.ShowUserMenu=false;
    }
  }

  goTo(url: string) {
    if(url === 'login') {
      localStorage.clear();
    }
    this.router.navigate([url]);
  }

}
