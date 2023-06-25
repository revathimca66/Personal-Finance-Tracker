using System.Data.SqlClient;
using System.Data;
using System.Collections.Generic;
using ExpenseTracker.Model;
using ExpenseTracker.Helper;
namespace ExpenseTracker.DataLayer
{
    public class ExpenseTrackerDL
    {
        public readonly utilityHelper Helper;
        public ExpenseTrackerDL(utilityHelper helper)
        {
            Helper = helper;
        }
        public DataSet SignUp(UserInfo user)
        {
            DataSet dtList = new DataSet();
            try
            {
                SqlParameter[] sp = new SqlParameter[] {
                    new SqlParameter("@user_name", user.full_name),
                    new SqlParameter("@email_id", user.email_id),
                    new SqlParameter("@user_password", user.user_password)
                };
                dtList = Helper.GetDatasetByCommand("user_details_add", sp);
            }

            catch (Exception )
            {
                throw ;
            }
            return dtList;
        }
        public DataSet SignIn(UserInfo user)
        {
            DataSet dtList = new DataSet();
            try
            {
                SqlParameter[] sp = new SqlParameter[] {
                    new SqlParameter("@email_id", user.email_id),
                    new SqlParameter("@user_password", user.user_password)
                };
                dtList = Helper.GetDatasetByCommand("user_login_verify", sp);
            }

            catch (Exception )
            {
                throw ;
            }
            return dtList;
        }
        public DataSet UpdateUser(UserInfo user)
        {
            DataSet dtList = new DataSet();
            try
            {
                SqlParameter[] sp = new SqlParameter[] {
                    new SqlParameter("@user_id", user.user_id),
                    new SqlParameter("@currency", user.currency),
                    new SqlParameter("@app_access", user.app_access)
                };
                dtList = Helper.GetDatasetByCommand("user_details_update", sp);
            }

            catch (Exception )
            {
                throw ;
            }
            return dtList;
        }
        public DataSet GetUser(UserInfo user)
        {
            DataSet dtList = new DataSet();
            try
            {
                SqlParameter[] sp = new SqlParameter[] {
                    new SqlParameter("@user_id", user.user_id)
                };
                dtList = Helper.GetDatasetByCommand("user_login_get", sp);
            }

            catch (Exception)
            {
                throw;
            }
            return dtList;
        }
        public DataSet AddCategory(Category category)
        {
            DataSet dtList = new DataSet();
            try
            {
                SqlParameter[] sp = new SqlParameter[] {
                    new SqlParameter("@user_id", category.user_id),
                    new SqlParameter("@category_name", category.category_name),
                    new SqlParameter("@spend_type", category.spending_type)
                };
                dtList = Helper.GetDatasetByCommand("category_type_add", sp);
            }

            catch (Exception )
            {
                throw ;
            }
            return dtList;
        }
        public DataSet DeleteCategory(Category category)
        {
            DataSet dtList = new DataSet();
            try
            {
                SqlParameter[] sp = new SqlParameter[] {
                     new SqlParameter("@category_id", category.category_id),
                    new SqlParameter("@user_id", category.user_id),
                };
                dtList = Helper.GetDatasetByCommand("category_type_delete", sp);
            }

            catch (Exception )
            {
                throw ;
            }
            return dtList;
        }
        public DataSet GetCategory(Category category)
        {
            DataSet dtList = new DataSet();
            try
            {
                SqlParameter[] sp = new SqlParameter[] {
                    new SqlParameter("@user_id", category.user_id),
                };
                dtList = Helper.GetDatasetByCommand("category_type_get", sp);
            }

            catch (Exception )
            {
                throw ;
            }
            return dtList;
        }
        public DataSet AddRecurringEvents(RecurringEvents recurringEvents)
        {
            DataSet dtList = new DataSet();
            try
            {
                SqlParameter[] sp = new SqlParameter[] {
                    new SqlParameter("@user_id", recurringEvents.user_id),
                    new SqlParameter("@category_type", recurringEvents.category_type),
                    new SqlParameter("@spend_type", recurringEvents.spend_type),
                    new SqlParameter("@duration_type", recurringEvents.duration_type),
                    new SqlParameter("@amount", recurringEvents.amount),
                    new SqlParameter("@event_date", recurringEvents.event_date),
                    new SqlParameter("@added_by", recurringEvents.user_id)
                };
                dtList = Helper.GetDatasetByCommand("recurring_event_add", sp);
            }

            catch (Exception )
            {
                throw ;
            }
            return dtList;
        }
        public DataSet DeleteRecurringEvents(RecurringEvents recurringEvents)
        {
            DataSet dtList = new DataSet();
            try
            {
                SqlParameter[] sp = new SqlParameter[] {
                    new SqlParameter("@user_id", recurringEvents.user_id),
                    new SqlParameter("@event_id", recurringEvents.event_id)
                };
                dtList = Helper.GetDatasetByCommand("recurring_event_delete", sp);
            }

            catch (Exception )
            {
                throw ;
            }
            return dtList;
        }
        public DataSet GetRecurrinEvents(RecurringEvents recurringEvents)
        {
            DataSet dtList = new DataSet();
            try
            {
                SqlParameter[] sp = new SqlParameter[] {
                    new SqlParameter("@user_id", recurringEvents.user_id),
                };
                dtList = Helper.GetDatasetByCommand("recurring_event_get_all", sp);
            }

            catch (Exception )
            {
                throw ;
            }
            return dtList;
        }
        public DataSet GetUpcomingRecurrinEvents(RecurringEvents recurringEvents)
        {
            DataSet dtList = new DataSet();
            try
            {
                SqlParameter[] sp = new SqlParameter[] {
                    new SqlParameter("@user_id", recurringEvents.user_id),
                };
                dtList = Helper.GetDatasetByCommand("recurring_upcoming_event_get", sp);
            }

            catch (Exception )
            {
                throw ;
            }
            return dtList;
        }
        public DataSet AddTransaction(Transactions transactions)
        {
            DataSet dtList = new DataSet();
            try
            {
                SqlParameter[] sp = new SqlParameter[] {
                    new SqlParameter("@user_id", transactions.user_id),
                    new SqlParameter("@category_type", transactions.category_type),
                    new SqlParameter("@spend_type", transactions.spend_type),
                    new SqlParameter("@amount", transactions.amount),
                    new SqlParameter("@transaction_on", transactions.transaction_date),
                    new SqlParameter("@added_by", transactions.user_id),
                    new SqlParameter("@recurring_event", transactions.recurring_event),
                    new SqlParameter("@duration_type", transactions.duration_type),
                     new SqlParameter("@Transaction_id", transactions.transaction_id==null?DBNull.Value:transactions.transaction_id)


                };
                dtList = Helper.GetDatasetByCommand("transaction_add", sp);
            }

            catch (Exception )
            {
                throw ;
            }
            return dtList;
        }
        public DataSet DeleteTransaction(Transactions transactions)
        {
            DataSet dtList = new DataSet();
            try
            {
                SqlParameter[] sp = new SqlParameter[] {
                    new SqlParameter("@user_id", transactions.user_id),
                     new SqlParameter("@transaction_id", transactions.transaction_id)
                    
                };
                dtList = Helper.GetDatasetByCommand("transaction_delete", sp);
            }

            catch (Exception )
            {
                throw ;
            }
            return dtList;
        }
        public DataSet GettransactionsMonthly(Transactions transactions)
        {
            DataSet dtList = new DataSet();
            try
            {
                SqlParameter[] sp = new SqlParameter[] {
                    new SqlParameter("@user_id", transactions.user_id),
                     new SqlParameter("@month_num", transactions.Month),
                    new SqlParameter("@year", transactions.Year),
                };
                dtList = Helper.GetDatasetByCommand("transaction_get_monthly", sp);
            }

            catch (Exception )
            {
                throw ;
            }
            return dtList;
        }
        public DataSet GettransactionsDashboard(Transactions transactions)
        {
            DataSet dtList = new DataSet();
            int? lastMonth = transactions.Month == 1 ? 12 : transactions.Month - 1;
            int? lastYear = transactions.Month == 1 ? transactions.Year - 1 : transactions.Year ;

            try
            {
                SqlParameter[] sp = new SqlParameter[] {
                    new SqlParameter("@user_id", transactions.user_id),
                    new SqlParameter("@month_num", transactions.Month),
                    new SqlParameter("@year", transactions.Year),
                    new SqlParameter("@last_month",lastMonth),
                    new SqlParameter("@last_year", lastYear),
                };
                dtList = Helper.GetDatasetByCommand("transaction_details_dashboard", sp);
            }

            catch (Exception )
            {
                throw ;
            }
            return dtList;
        }
        public DataSet GetDuration(Duration duration)
        {
            DataSet dtList = new DataSet();
            try
            {
                SqlParameter[] sp = new SqlParameter[] {
                    new SqlParameter("@user_id", duration.user_id),
                };
                dtList = Helper.GetDatasetByCommand("duration_type_get", sp);
            }

            catch (Exception )
            {
                throw ;
            }
            return dtList;
        }
    }
}
