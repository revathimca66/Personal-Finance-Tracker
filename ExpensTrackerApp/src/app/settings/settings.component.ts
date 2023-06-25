import { Component } from '@angular/core';
import { ExpenseApiService } from '../services/expense-api.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  userId: Number;
  recurringEvents: any = [];
  categories: any = [];
  tabid: number = 1;
  closeResult: any;
  modalOptions: NgbModalOptions;
  eventForm: FormGroup;
  categoryForm: FormGroup;
  currency:any;
  showEdit:boolean=false;
  occurance:any=['Daily','Weekly','Monthly'];
  recurringList:any=[];
  constructor(private apiservice: ExpenseApiService, private modalService: NgbModal, private fb: FormBuilder) {
    this.userId = Number(sessionStorage.getItem('userId'));
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg', windowClass: 'modal-xl'
    }
    this.eventForm = this.fb.group({
      transactionCategory: [null, Validators.required],
      transactionDate: ['', Validators.required],
      transactionAmount: ['', Validators.required],
      duration: ['', Validators.required]
    });
    this.categoryForm = this.fb.group({
      transactionCategory: [null, Validators.required],
      categoryName: ['', Validators.required],

    });
  }
  ngOnInit(): void {
    this.getRecurringEvents();
    this.getCategory();
    this.getUserInfo();
  }
  userInfo:any=[];
  getUserInfo() {
    var inputObj = {
      "user_id": this.userId
    }
    this.apiservice.GetUser(inputObj).subscribe(result => {
      if (result) {
        this.userInfo = result;
      }
    })
  }
  getRecurringEvents() {
    var inputObj = {
      "user_id": this.userId
    }
    this.apiservice.GetRecurringEvent(inputObj).subscribe(result => {
      if (result) {
        this.recurringEvents = result.recurring_events;
        this.recurringList=[];
        for(var d=0;d<this.occurance.length;d++) {
          this.recurringList.push({
            'occursOn':this.occurance[d],
            'list':this.recurringEvents.filter((t:any)=>t.duration_name==this.occurance[d])
          })
        }

      }
    })
  }
  deleteRecurringEvent(event_id: number) {
    var inputObj = {
      "user_id": this.userId,
      "event_id": event_id,

    }
    this.apiservice.DeleteRecurringEvent(inputObj).subscribe(result => {
      if (result) {
        this.apiservice.showSuccessMessage("Recurring transaction  deleted successfully !");
        this.getRecurringEvents();

      }
    })
  }
  getCategory() {
    var inputObj = {
      "user_id": this.userId,
    }
    this.apiservice.GetCategory(inputObj).subscribe(result => {
      if (result) {
        
        this.categories = result.categories;
      }
    })
  }
  deletecategory(category_id: number) {
    var inputObj = {
      "user_id": this.userId,
      "category_id": category_id,

    }
    this.apiservice.DeleteCategory(inputObj).subscribe(result => {
      if (result) {
        this.apiservice.showSuccessMessage("Category  deleted successfully !");
        this.getCategory();

      }
    })
  }
  tabChange(tabid: number) {
    this.tabid = tabid;
  }

  open(content: any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addEvent() {
    var ctype = this.eventForm.controls["transactionCategory"].value;
    let id = this.categories.filter((t: any) => t.category_name == ctype);
    var inputObj = {
      "user_id": this.userId,
      "category_type": id[0].category_id,
      "spend_type": id[0].category_type == 'Income' ? 1 : 2,
      "amount": this.eventForm.controls["transactionAmount"].value,
      "event_date": this.eventForm.controls["transactionDate"].value,
      "duration_type": this.eventForm.controls["duration"].value == "Daily" ? 4 :
        this.eventForm.controls["duration"].value == "Monthly" ? 2 : this.eventForm.controls["duration"].value == "Yearly" ? 1 : 0
    }
    this.apiservice.AddRecurringEvent(inputObj).subscribe(result => {
      if (result) {
        this.apiservice.showSuccessMessage("Recurring transaction added successfully !");
        this.getRecurringEvents();
      }
    })
  }
  addCategory() {
    var ctype = this.categoryForm.controls["transactionCategory"].value;
    var inputObj = {
      "user_id": this.userId,
      "spending_type": ctype == 'Income' ? 1 : 2,
      "category_name": this.categoryForm.controls["categoryName"].value,
    }
    this.apiservice.AddCategory(inputObj).subscribe(result => {
      if (result) {
        this.apiservice.showSuccessMessage("Category added successfully !");
        this.getCategory();
      }
    })
  }
  clearcategoryForm(){
    this.categoryForm.reset();
    this.modalService.dismissAll();
  }
  clearEventform(){
    this.eventForm .reset();
    this.modalService.dismissAll();
  }
  deactivate(){
    var inputObj = {
      "user_id": this.userId,
      "currency":  this.userInfo.currency,
      "app_access": 0,
    }
    this.apiservice.UpdateuserInfo(inputObj).subscribe(result => {
      if (result) {
        this.getCategory();
      }
    })
  }
  changedenomination(){
    var inputObj = {
      "user_id": this.userId,
      "currency": this.currency,
      "app_access": 1,
    }
    this.apiservice.UpdateuserInfo(inputObj).subscribe(result => {
      if (result) {
        this.currency=null;
        this.showEdit=false;
        this.apiservice.showSuccessMessage("Updated successfully !");
        this.getUserInfo();      
      }
    })
  }
  editDenomination(){
    this.showEdit=true;
  }
  canceldenomination(){
    this.showEdit=false;
  }
}
