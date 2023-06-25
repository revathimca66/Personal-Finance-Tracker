import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExpenseApiService {
  private baseUrl = "http://logi.somee.com/api/ExpenseTracker/";
  private signUpUrl = this.baseUrl + "signup";
  private signinUrl = this.baseUrl + "signin";
  private updateuserinfoUrl = this.baseUrl + "updateuserinfo";
  private getuserinfoUrl = this.baseUrl + "getuser";
  private addcategoryUrl = this.baseUrl + "addcategory";
  private deletecategoryUrl = this.baseUrl + "deletecategory";
  private getcategoryUrl = this.baseUrl + "getcategory";
  private addrecurringeventsUrl = this.baseUrl + "addrecurringevents";
  private deleterecurringeventsUrl = this.baseUrl + "deleterecurringevents";
  private getrecurringeventsUrl = this.baseUrl + "getrecurringevents";
  private getupcomingrecurringeventsUrl = this.baseUrl + "getupcomingrecurringevents";
  private addtransactionUrl = this.baseUrl + "addtransaction";
  private deletetransactionUrl = this.baseUrl + "deletetransaction";
  private getmonthlytransactionsUrl = this.baseUrl + "getmonthlytransactions";
  private gettransactionsdashboardUrl = this.baseUrl + "gettransactionsdashboard";
  private getdurationUrl = this.baseUrl + "getduration";

  constructor(private http: HttpClient) {

  }
  contentType = {
    headers: {
      "Content-Type": 'application/json;charset=utf-8'
    }
  };

  SignUp(input: any): Observable<any> {
    return this.http.post(this.signUpUrl, input).pipe(map(result => {
      return result
    }),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
  SignIn(input: any): Observable<any> {
    return this.http.post(this.signinUrl, input).pipe(map(result => {
      return result
    }),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
  UpdateuserInfo(input: any): Observable<any> {
    return this.http.post(this.updateuserinfoUrl, input).pipe(map(result => {
      return result
    }),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
  GetUser(input: any): Observable<any> {
    return this.http.post(this.getuserinfoUrl, input).pipe(map(result => {
      return result
    }),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
  AddCategory(input: any): Observable<any> {
    return this.http.post(this.addcategoryUrl, input).pipe(map(result => {
      return result
    }),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
  DeleteCategory(input: any): Observable<any> {
    return this.http.post(this.deletecategoryUrl, input).pipe(map(result => {
      return result
    }),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
  GetCategory(input: any): Observable<any> {
    return this.http.post(this.getcategoryUrl, input).pipe(map(result => {
      return result
    }),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
  AddRecurringEvent(input: any): Observable<any> {
    return this.http.post(this.addrecurringeventsUrl, input).pipe(map(result => {
      return result
    }),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
  GetRecurringEvent(input: any): Observable<any> {
    return this.http.post(this.getrecurringeventsUrl, input).pipe(map(result => {
      return result
    }),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
  DeleteRecurringEvent(input: any): Observable<any> {
    return this.http.post(this.deleterecurringeventsUrl, input).pipe(map(result => {
      return result
    }),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
  GetUpcomingRecurringEvent(input: any): Observable<any> {
    return this.http.post(this.getupcomingrecurringeventsUrl, input).pipe(map(result => {
      return result
    }),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
  AddTransaction(input: any): Observable<any> {
    return this.http.post(this.addtransactionUrl, input).pipe(map(result => {
      return result
    }),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
  deleteTransaction(input: any): Observable<any> {
    return this.http.post(this.deletetransactionUrl, input).pipe(map(result => {
      return result
    }),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
  GetMonthlyTransaction(input: any): Observable<any> {
    return this.http.post(this.getmonthlytransactionsUrl, input).pipe(map(result => {
      return result
    }),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
  GetTransactionDashboard(input: any): Observable<any> {
    return this.http.post(this.gettransactionsdashboardUrl, input, this.contentType).pipe(map(result => {
      return result
    }),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
  GetDuration(input: any): Observable<any> {
    return this.http.post(this.getdurationUrl, input).pipe(map(result => {
      return result
    }),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
  showSuccessMessage(message: string) {
    const ele = document.getElementsByClassName('lt-success')as HTMLCollectionOf<HTMLElement>;
    ele[0].style.display = 'block';
    ele[0].textContent=message;
    setTimeout(() => {
      ele[0].style.display = 'none';
    }, 3000);
  }
  showErrorMessage(message: string) {
    const ele = document.getElementsByClassName('lt-error')as HTMLCollectionOf<HTMLElement>;
    ele[0].style.display = 'block';
    ele[0].textContent=message;
    setTimeout(() => {
      ele[0].style.display = 'none';
    }, 3000);
  }
}
