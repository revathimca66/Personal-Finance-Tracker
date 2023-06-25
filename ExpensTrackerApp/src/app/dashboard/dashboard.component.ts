import { Component, OnInit } from '@angular/core';
import { ExpenseApiService } from '../services/expense-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  userId: Number;
  transactionsSmmary: any = [];
  categorywiseTransactions: any = [];
  recentTransactions: any = [];
  weeklyTransactions: any = [];
  upcomingEvents: any = [];
  currency: string = "";
  MonthName: string;
  lastMonthName: string;
  lastyear: Number;
  year: Number;
  month_Num: any;
  month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  cur_year: number;
  cur_month: number;
  //Part-1
  totalBalance: number = 0;
  previousBalance: number = 0;
  difference: number = 0;
  arrowClass: string = "";
  summcount: any = [];
  percentage:number=0;
  //chart
  chartConfig = {
    displayModeBar: false, responsive: true
  }
  //Category
  categoryData: any = [];
  categorylayout: any = [];
  //weekly bar
  weeklyData: any = [];
  weeklyBarlayout: any = [];
  //month
  monthlyData: any = [];
  monthlylayout: any = [];
  transactions_list:any=[];
  //cash flow
  incomeCash:number=0;
  expenseCash:number=0;
  cashtotal:number=0;
  incomePercent:any=0;
  expensePercent:any=0;
  constructor(private apiservice: ExpenseApiService) {
    const d = new Date();
    this.cur_year = d.getFullYear();
    this.cur_month = d.getMonth();
    this.userId = Number(sessionStorage.getItem('userId'));;
    this.MonthName = this.month_names[this.cur_month];
    this.month_Num = this.cur_month + 1;
    this.year = this.cur_year;
    sessionStorage.setItem('MonthName', this.MonthName);
    sessionStorage.setItem('year',this.year.toString());
    sessionStorage.setItem('month_Num', this.month_Num);
    this.lastMonthName = this.cur_month == 1 ? this.month_names[11] : this.month_names[this.cur_month - 1];
    this.lastyear = this.cur_month == 1 ? this.cur_year - 1 : this.cur_year;
  }
  ngOnInit(): void {
    this.getDasboardDetails();
    this.getUpcomingEvents();
  }
  getDasboardDetails() {
    var inputObj = {
      "user_id": this.userId,
      "month": this.month_Num,
      "year": this.year
    }
    this.apiservice.GetTransactionDashboard(inputObj).subscribe(result => {
      if (result) {

        this.transactionsSmmary = result.transactions_summary;
        this.categorywiseTransactions = result.transactions_categorywise;
        this.recentTransactions = result.transactions_recent;
        this.weeklyTransactions = result.transactions_weekly;
        this.currency = result.currency;
        this.transactions_list=result.transactions_list;
        this.calculateSummary();
        this.categoryPieChart();
        this.weeklyBarChart();
        this.transactionsLineChart();
        this.getcashFlow();
      }
    })
  }
  getUpcomingEvents() {
    var inputObj = {
      "user_id": this.userId
    }
    this.apiservice.GetUpcomingRecurringEvent(inputObj).subscribe(result => {
      if (result) {
        this.upcomingEvents = result.recurring_events;

      }
    })
  }
  nextYear(year: number) {
    this.cur_year = year + 1;
    this.year = this.cur_year;
    this.lastMonthName = this.month_Num == 1 ? this.month_names[11] : this.month_names[this.month_Num - 2];
    this.lastyear = this.month_Num == 1 ? this.cur_year - 1 : this.cur_year;
    this.getDasboardDetails();
  }
  prevyear(year: number) {
    this.cur_year = year - 1;
    this.year = this.cur_year;
    this.lastMonthName = this.month_Num == 1 ? this.month_names[11] : this.month_names[this.month_Num - 2];
    this.lastyear = this.month_Num == 1 ? this.cur_year - 1 : this.cur_year;;
    sessionStorage.setItem('MonthName', this.MonthName);
    sessionStorage.setItem('year',this.year.toString());
    sessionStorage.setItem('month_Num', this.month_Num);
    this.getDasboardDetails();
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
    this.getDasboardDetails();
  }
  calculateSummary() {
    this.summcount = this.transactionsSmmary.filter((t: any) => t.amount > 0);
    this.totalBalance = this.transactionsSmmary[0].amount - this.transactionsSmmary[1].amount;
    this.previousBalance = this.transactionsSmmary[2].amount - this.transactionsSmmary[3].amount;
    this.difference = this.totalBalance - Math.abs(this.previousBalance);
    this.percentage=this.calculatePercentage(this.difference,this.totalBalance);
    this.arrowClass = this.difference >= 0 ? "greenUp" : "reddDown";
  }
   calculatePercentage(diff: number, num1: number): number {
    return  ((diff) / num1) * 100
  }
  categoryPieChart() {
    if (this.categorywiseTransactions) {
      this.categoryData = [{
        values: this.categorywiseTransactions.map((t: any) => t.amount),
        labels: this.categorywiseTransactions.map((t: any) => t.category_name),
        type: 'pie',
         hole: .5,
      }];

      this.categorylayout = {
        height: 180,
        //width: 300,
        annotations: [
          {
            font: {
              size: 20
            },
            showarrow: false,
            text: "",
            // text: "+ " + this.transactionsSmmary[0].amount + "<br>- " + this.transactionsSmmary[1].amount,

          }
        ],
        margin: { "t": 0, "b": 0, "l": 0, "r": 0 },
        showlegend: false
      };
    }
  }
  weeklyBarChart() {
    if (this.weeklyTransactions) {
      var incomeData = this.weeklyTransactions.filter((t: any) => t.spending_name == 'Income')
      var trace1 = {
        x: incomeData.map((t: any) => t.week_name),
        y: incomeData.map((t: any) => t.amount),
        name: 'Income',
        type: 'bar',
        marker: {
          color: '#228022',
          
        }
      };
      var expenseData = this.weeklyTransactions.filter((t: any) => t.spending_name == 'Expense')

      var trace2 = {
        x: expenseData.map((t: any) => t.week_name),
        y: expenseData.map((t: any) => t.amount),
        name: 'Expense',
        type: 'bar',
        marker: {
          color: '#FF6961',
          
        }
      };
      this.weeklyData = [trace1, trace2];
      this.weeklyBarlayout = {
        height: 250,
        bargap :0.5,
        bargroupgap: 0.1,
        annotations: [
          {
            font: {
              size: 20
            },
            showarrow: false,
            text: ""
          }
        ],
        margin: { "t": 0, "b": 30, "l": 30, "r": 0 },
        showlegend: false,
        legend: {"orientation": "h", x: 0.3},
        xaxis: {
          showgrid: false
        },
        yaxis: {
          showgrid: false,
          showline: false
        },
      };
    }
  }

  transactionsLineChart() {
    if (this.recentTransactions) {
      var trace1 = {
        x: this.transactions_list.map((t: any) => t.transaction_date),
        y: this.transactions_list.map((t: any) => t.amount),
        name: 'Transactions',
        type: 'scatter',
        line: { shape: 'spline' },
        // marker: {
        //   color: '#6c3780',
        //   opacity: 0.6,
        //   line: {
        //     color: '#6c3780',
        //     width: 5
        //   }
        // }
      };

      this.monthlyData = [trace1];
      this.monthlylayout = {
        height: 250,
        //width: 700, 
        bargap: 10,
        bargroupgap: 15,
        annotations: [
          {
            font: {
              size: 20
            },
            showarrow: false,
            text: "",

          }
        ],
        xaxis: {
          showgrid: false
        },
        yaxis: {
          showgrid: false,
          showline: false
        },
        margin: { "t": 0, "b": 50, "l": 30, "r": 0 },
        showlegend: false,
        barmode: 'group',
        tickangle: 30
      };
    }
  }
 
  getcashFlow(){
    let incomeCash=this.recentTransactions.filter((t:any)=>t.category_name=='Cash'&&t.spending_name=='Income');
    let expenseCash=this.recentTransactions.filter((t:any)=>t.category_name=='Cash'&&t.spending_name=='Expense');
    let incomeCasharry=incomeCash.map((t:any)=>t.amount);
    this.incomeCash = incomeCasharry.reduce((acc:any, cur:any) => acc + cur, 0);
    let expenseCasharry=expenseCash.map((t:any)=>t.amount);
    this.expenseCash = expenseCasharry.reduce((acc:any, cur:any) => acc + cur, 0);
    let sum=this.incomeCash+this.expenseCash;
    this.incomePercent=(this.incomeCash/sum)*100;
    this.expensePercent=(this.expenseCash/sum)*100;
  }
}


