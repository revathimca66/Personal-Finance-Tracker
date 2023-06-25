import { Component, OnInit } from '@angular/core';
import { ExpenseApiService } from '../services/expense-api.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-viewtransactions',
  templateUrl: './viewtransactions.component.html',
  styleUrls: ['./viewtransactions.component.css']
})
export class ViewtransactionsComponent implements OnInit {
  tabid: number = 1;
  closeResult: any;
  modalOptions: NgbModalOptions;
  transactionForm: FormGroup;
  transactionEditForm:FormGroup;
  categoryList: any = [];
  categories:any=[];
  recurringFlag:boolean=false;
  userId: Number;
  transactionsDetails: any = [];
  MonthName: string;
  lastMonthName: string;
  lastyear: Number;
  year: Number;
  month_Num: any;
  month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  cur_year: number;
  cur_month: number;
  selectedCategory:string="";
  transactionId:any=null;
  constructor(private modalService: NgbModal, private fb: FormBuilder,private apiservice: ExpenseApiService) {
    const d = new Date();
    this.cur_year = Number(sessionStorage.getItem('year'));
    this.cur_month=Number(sessionStorage.getItem('month_Num'));
    this.userId = Number(sessionStorage.getItem('userId'));
    this.MonthName = this.month_names[this.cur_month-1];
    this.month_Num = this.cur_month ;
    this.year = this.cur_year;
    sessionStorage.setItem('MonthName', this.MonthName);
    sessionStorage.setItem('year',this.year.toString());
    sessionStorage.setItem('month_Num', this.month_Num);
    this.lastMonthName = this.cur_month == 1 ? this.month_names[11] : this.month_names[this.cur_month - 1];
    this.lastyear = this.cur_month == 1 ? this.cur_year - 1 : this.cur_year;
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg', windowClass: 'modal-xl'
    }
    this.transactionForm = this.fb.group({
      transactionCategory: [null, Validators.required],
      transactionDate: ['', Validators.required],
      transactionAmount: ['', Validators.required],
      recurringEvent:[false, Validators.required],
      duration:[]
    });
    this.transactionEditForm = this.fb.group({
      transactionCategory: [null, Validators.required],
      transactionDate: ['', Validators.required],
      transactionAmount: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.getCategory();
    this.getTransactiondetails();
  }
  getTransactiondetails() {
    var inputObj = {
      "user_id": this.userId,
      "month": this.month_Num,
      "year": this.year
    }
    this.apiservice.GetMonthlyTransaction(inputObj).subscribe(result => {
      if (result) {
        this.transactionsDetails = result.monthly_transactions;
        
      }
    })
  }
  deleteTransaction(transactionId:number) {
    var inputObj = {
      "user_id": this.userId,
      "transaction_id": transactionId,
      
    }
    this.apiservice.deleteTransaction(inputObj).subscribe(result => {
      if (result) {
        this.apiservice.showSuccessMessage("Transaction  deleted successfully !");
       
      this.getTransactiondetails();  
      
      }
    })
  }
  nextYear(year: number) {
    this.cur_year = year + 1;
    this.year = this.cur_year;
    this.lastMonthName = this.month_Num == 1 ? this.month_names[11] : this.month_names[this.month_Num - 2];
    this.lastyear = this.month_Num == 1 ? this.cur_year - 1 : this.cur_year;
    this.getTransactiondetails();
  }
  prevyear(year: number) {
    this.cur_year = year - 1;
    this.year = this.cur_year;
    this.lastMonthName = this.month_Num == 1 ? this.month_names[11] : this.month_names[this.month_Num - 2];
    this.lastyear = this.month_Num == 1 ? this.cur_year - 1 : this.cur_year;;
    sessionStorage.setItem('MonthName', this.MonthName);
    sessionStorage.setItem('year',this.year.toString());
    sessionStorage.setItem('month_Num', this.month_Num);
    this.getTransactiondetails();
  }
  onMonthChange(mNum: number, Mname: string) {
    this.MonthName = Mname;
    this.month_Num = mNum;
    this.year = this.cur_year;
    this.lastMonthName = mNum == 1 ? this.month_names[11] : this.month_names[mNum - 2];
    this.lastyear = mNum == 1 ? this.cur_year - 1 : this.cur_year;
    sessionStorage.setItem('MonthName', this.MonthName);
    sessionStorage.setItem('year',this.year.toString());
    sessionStorage.setItem('month_Num', this.month_Num);
    this.getTransactiondetails();
  }
  public export(): void {
   
 const docDefinition:any = {
    
      content: [
        { text: "Transactions on "+this.MonthName +"-"+this.year, style: "header" },
          
        {
          style: "tableExample",
          color: '#444',
          
          headerRows: 1,
        widths: [ 1000, 1000, 1000, 1000 ],
          table: {
            body: [             
              ["Transaction Type", "Category", "Transaction On","Amount"],
              ...this.transactionsDetails.map((p:any) => ([p.spending_name, p.category_name, p.transaction_date, p.amount])),  
                ]
          }
        }
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: 'center',  
          color: '#6c3780' 
        },
        subheader: {
          fontSize: 15,
          bold: true,
          margin: [0, 0, 0, 0]
        },
        tableExample: {
          fontSize: 13,
          margin: [80, 20, 50, 0],
          color: '#6c3780' ,
          width:1000
        }
      }
    };

    pdfMake.createPdf(docDefinition).download(this.MonthName +"-"+this.year+".pdf");
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
  tabChange(tabid: number) {
    this.tabid = tabid;
    if(tabid==1){
    this.categoryList= this.categories.filter((t:any)=>t.category_type=="Income");
    this.selectedCategory= this.categoryList[0].category_name;
    }else{
      this.categoryList= this.categories.filter((t:any)=>t.category_type=="Expense");
      this.selectedCategory= this.categoryList[0].category_name;
    }
    this.transactionForm.patchValue({
      transactionCategory:this.selectedCategory,
      recurringEvent:false,
    });
  }
  addTransaction() {
    var ctype=this.transactionForm.controls["transactionCategory"].value;
    let id=this.categories.filter((t:any)=>t.category_name==ctype);
    var inputObj = {
      "transaction_id":null,
      "user_id": this.userId,
      "category_type": id[0].category_id,
      "spend_type": this.tabid,
      "amount": this.transactionForm.controls["transactionAmount"].value,
      "transaction_date": this.transactionForm.controls["transactionDate"].value,
      "recurring_event": this.transactionForm.controls["recurringEvent"].value?1:0,
      "duration_type": this.transactionForm.controls["duration"].value=="Daily"?4:
      this.transactionForm.controls["duration"].value=="Monthly"?2:this.transactionForm.controls["duration"].value=="Yearly"?1:0
    }
    this.apiservice.AddTransaction(inputObj).subscribe(result => {
      if (result) {
        this.apiservice.showSuccessMessage("Transaction  added successfully !");       
        this.getTransactiondetails();
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
        this.categoryList= this.categories.filter((t:any)=>t.category_type=="Income");
        this.selectedCategory= this.categoryList[0].category_name;
        this.transactionForm.patchValue({
          transactionCategory:this.selectedCategory,
          recurringEvent:false,
        });
      
      }
    })
  }
  recurringChange(){
    this.recurringFlag=this.transactionForm.controls["recurringEvent"].value;

    console.log(this.recurringFlag);
  }
  categoryChange(){

  }
  cleartransactionForm(){
    this.transactionForm .reset();
    this.modalService.dismissAll();
    this.tabChange(1);
  }
  Edit(transactiondetail:any,editmodal:any){   
    this.tabid=transactiondetail.spending_name=='Income'?1:2; 
    this.tabChange(this.tabid);
    this.modalService.open(editmodal, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  this.transactionId=transactiondetail.transaction_id
    this.transactionEditForm.setValue({
      transactionCategory:transactiondetail.category_name,
      transactionDate: transactiondetail.transactiondate ,
      transactionAmount: transactiondetail.amount
 });
   }
  clearEdittransactionForm(){
    this.transactionEditForm.reset();
    this.modalService.dismissAll();
    this.tabChange(1);
  }
  SaveEditTransaction(){
    var ctype=this.transactionEditForm.controls["transactionCategory"].value;
    let id=this.categories.filter((t:any)=>t.category_name==ctype);
    var inputObj = {
      "transaction_id":this.transactionId,
      "user_id": this.userId,
      "category_type": id[0].category_id,
      "spend_type": this.tabid,
      "amount": this.transactionEditForm.controls["transactionAmount"].value,
      "transaction_date": this.transactionEditForm.controls["transactionDate"].value,
      "recurring_event": 0,
      "duration_type": 0
     }
    this.apiservice.AddTransaction(inputObj).subscribe(result => {
      if (result) {
        this.apiservice.showSuccessMessage("Transaction  Updated successfully !");       
        this.getTransactiondetails();
        this.clearEdittransactionForm();
      }
    })
  }
}
