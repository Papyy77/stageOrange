import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  notes: any = [];
  user: any;
  pager = {
    index: 0,
    size: 5,
    count: 1
  };
  constructor(private userService: UserService) { }

  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || "{}");
    await this.getNotes();
  }


  async getNotes() {
    try {
      const res: any = await this.userService.getNotes(this.user.email).toPromise(); 
      this.notes = res.data;
      this.pager.count = this.notes.length;
      console.log('notes::::', this.notes);
    } catch (error) {
      console.log('errrrr', error);
    }
  }

  get filteredNotes() {
    return (this.notes) ?
      this.notes.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  goTo(index: number) {
    console.log('index::;;', index);
    if (index >= 1 && index < this.pager.count) {
      this.pager.index = index;
    }
     
  }

  pos(note: any) {
    return this.notes.findIndex((elt:any) => elt.id === note.id) + 1;
  }
}

   
  


