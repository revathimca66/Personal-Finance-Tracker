import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  userId: number;
  menuId: number = 1;
  title = 'ExpensTrackerApp';
  constructor(private router: Router) {

    this.userId = Number(sessionStorage.getItem('userId'));
    if(this.userId==0){
      this.router.navigate(['']);
      sessionStorage.clear();
    }

  }
  navigateto(menuId: number) {
    
    if (menuId == 4) {
      this.router.navigate(['']);
      sessionStorage.clear();
    }else{
      this.menuId = menuId;
    }
  }
}
