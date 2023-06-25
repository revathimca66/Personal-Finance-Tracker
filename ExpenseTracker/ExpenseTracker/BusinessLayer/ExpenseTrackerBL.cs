using System;
using System.Data;
using System.Collections.Generic;
using ExpenseTracker.Model;
using ExpenseTracker.DataLayer;

namespace ExpenseTracker.BusinessLayer
{
    public class ExpenseTrackerBL
    {
        public readonly ExpenseTrackerDL expenseTrackerDL;
        public ExpenseTrackerBL(ExpenseTrackerDL expense)
        {
            expenseTrackerDL = expense;
        }
        public string? SignUp(UserInfo user)
        {
            UserInfo userInfo = new UserInfo();
            string? status = "failed";
            try
            {
                
                DataSet ds = new DataSet();
                ds = expenseTrackerDL.SignUp(user);
                if(ds.Tables.Count > 0)
                {
                    if(ds.Tables[0].Rows.Count > 0)
                    {
                        status= ds.Tables[0].Rows[0]["insert_status"].ToString();
                    }
                }
                return status;
            }
            catch(Exception )
            {
                throw ;
            }
           
        }
        public UserInfo SignIn(UserInfo user)
        {
            UserInfo userInfo = new UserInfo();
            try
            {

                DataSet ds = new DataSet();
                ds = expenseTrackerDL.SignIn(user);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        userInfo.user_id = Convert.ToInt32(ds.Tables[0].Rows[0]["user_id"].ToString());
                        userInfo.full_name = ds.Tables[0].Rows[0]["full_name"].ToString();
                        userInfo.email_id = ds.Tables[0].Rows[0]["email_id"].ToString();
                        userInfo.currency = ds.Tables[0].Rows[0]["currency"].ToString();
                    }
                }
                return userInfo;
            }
            catch (Exception )
            {
                throw ;
            }
           
        }      
        public UserInfo UpdateUser(UserInfo user)
        {
            UserInfo userInfo = new UserInfo();
            try
            {

                DataSet ds = new DataSet();
                ds = expenseTrackerDL.UpdateUser(user);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        userInfo.user_id = Convert.ToInt32(ds.Tables[0].Rows[0]["user_id"].ToString());
                        userInfo.full_name = ds.Tables[0].Rows[0]["full_name"].ToString();
                        userInfo.email_id = ds.Tables[0].Rows[0]["email_id"].ToString();
                        userInfo.currency = ds.Tables[0].Rows[0]["currency"].ToString();
                    }
                }
                return userInfo;
            }
            catch (Exception )
            {
                throw ;
            }

        }
        public UserInfo GetUser(UserInfo user)
        {
            UserInfo userInfo = new UserInfo();
            try
            {

                DataSet ds = new DataSet();
                ds = expenseTrackerDL.GetUser(user);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        userInfo.user_id = Convert.ToInt32(ds.Tables[0].Rows[0]["user_id"].ToString());
                        userInfo.full_name = ds.Tables[0].Rows[0]["full_name"].ToString();
                        userInfo.email_id = ds.Tables[0].Rows[0]["email_id"].ToString();
                        userInfo.currency = ds.Tables[0].Rows[0]["currency"].ToString();
                    }
                }
                return userInfo;
            }
            catch (Exception)
            {
                throw;
            }

        }
        public string? AddCategory(Category category)
        {
           
            string? status = "failed";
            try
            {

                DataSet ds = new DataSet();
                ds = expenseTrackerDL.AddCategory(category);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        status = ds.Tables[0].Rows[0]["insert_status"].ToString();
                    }
                }
                return status;
            }
            catch (Exception )
            {
                throw ;
            }

        }
        public string? DeleteCategory(Category category)
        {

            string? status = "failed";
            try
            {

                DataSet ds = new DataSet();
                ds = expenseTrackerDL.DeleteCategory(category);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        status = ds.Tables[0].Rows[0]["insert_status"].ToString();
                    }
                }
                return status;
            }
            catch (Exception )
            {
                throw ;
            }

        }
        public CategoryContext GetCategory(Category category)
        {

            CategoryContext categoryContext = new CategoryContext();
            List<Category> categorie_data = new List<Category>();
            try
            {

                DataSet ds = new DataSet();
                ds = expenseTrackerDL.GetCategory(category);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        categorie_data = (from DataRow row in ds.Tables[0].Rows
                                          select new Category
                                          {

                                              category_id = Convert.ToInt32(row["category_id"].ToString()),
                                              category_name= row["category_name"].ToString(),
                                              category_type= row["spending_name"].ToString()

                                          }).ToList();
                    }
                }
                categoryContext.categories = categorie_data;
                return categoryContext;

            }
            catch (Exception )
            {
                throw ;
            }

        }

        public string? AddRecurringEvents(RecurringEvents recurringEvents)
        {

            string? status = "failed";
            try
            {

                DataSet ds = new DataSet();
                ds = expenseTrackerDL.AddRecurringEvents(recurringEvents);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        status = ds.Tables[0].Rows[0]["insert_status"].ToString();
                    }
                }
                return status;
            }
            catch (Exception )
            {
                throw ;
            }

        }
        public string? DeleteRecurringEvents(RecurringEvents recurringEvents)
        {

            string? status = "failed";
            try
            {

                DataSet ds = new DataSet();
                ds = expenseTrackerDL.DeleteRecurringEvents(recurringEvents);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        status = ds.Tables[0].Rows[0]["insert_status"].ToString();
                    }
                }
                return status;
            }
            catch (Exception )
            {
                throw ;
            }

        }

        public RecurringeventContext GetRecurringEvents(RecurringEvents recurringEvents)
        {

            RecurringeventContext recurringeventContext = new RecurringeventContext();
            List<RecurringEvents> recurring_data = new List<RecurringEvents>();
            try
            {

                DataSet ds = new DataSet();
                ds = expenseTrackerDL.GetRecurrinEvents(recurringEvents);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        recurring_data = (from DataRow row in ds.Tables[0].Rows
                                          select new RecurringEvents
                                          {

                                              event_id = Convert.ToInt32(row["event_id"].ToString()),
                                              category_name = row["category_name"].ToString(),
                                              spending_name = row["spending_name"].ToString(),
                                              duration_name = row["duration_name"].ToString(),
                                              amount =Convert.ToDecimal( row["amount"].ToString()),
                                              event_date = row["event_date"].ToString(),
                                              currency = row["currency"].ToString()

                                          }).ToList();
                    }
                }
                recurringeventContext.recurring_events = recurring_data;
                return recurringeventContext;

            }
            catch (Exception )
            {
                throw ;
            }

        }
        public RecurringeventContext GetUpcomingRecurrinEvents(RecurringEvents recurringEvents)
        {

            RecurringeventContext recurringeventContext = new RecurringeventContext();
            List<RecurringEvents> recurring_data = new List<RecurringEvents>();
            try
            {

                DataSet ds = new DataSet();
                ds = expenseTrackerDL.GetUpcomingRecurrinEvents(recurringEvents);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        recurring_data = (from DataRow row in ds.Tables[0].Rows
                                          select new RecurringEvents
                                          {

                                              event_id = Convert.ToInt32(row["event_id"].ToString()),
                                              category_name = row["category_name"].ToString(),
                                              spending_name = row["spending_name"].ToString(),
                                              duration_name = row["duration_name"].ToString(),
                                              amount = Convert.ToDecimal(row["amount"].ToString()),
                                              event_date = row["event_date"].ToString(),
                                              currency = row["currency"].ToString()
                                          }).ToList();
                    }
                }
                recurringeventContext.recurring_events = recurring_data;
                return recurringeventContext;

            }
            catch (Exception )
            {
                throw ;
            }

        }

        public string? AddTransaction(Transactions transactions)
        {

            string? status = "failed";
            try
            {

                DataSet ds = new DataSet();
                ds = expenseTrackerDL.AddTransaction(transactions);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        status = ds.Tables[0].Rows[0]["insert_status"].ToString();
                    }
                }
                return status;
            }
            catch (Exception )
            {
                throw ;
            }

        }
        public string? DeleteTransaction(Transactions transactions)
        {

            string? status = "failed";
            try
            {

                DataSet ds = new DataSet();
                ds = expenseTrackerDL.DeleteTransaction(transactions);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        status = ds.Tables[0].Rows[0]["insert_status"].ToString();
                    }
                }
                return status;
            }
            catch (Exception )
            {
                throw ;
            }

        }
        public TransactionContext GettransactionsMonthly(Transactions transactions)
        {

            TransactionContext transactionContext = new TransactionContext();
            List<Transactions> transactions_data = new List<Transactions>();
            try
            {

                DataSet ds = new DataSet();
                ds = expenseTrackerDL.GettransactionsMonthly(transactions);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        transactions_data = (from DataRow row in ds.Tables[0].Rows
                                          select new Transactions
                                          {

                                              transaction_id = Convert.ToInt32(row["transaction_id"].ToString()),
                                              category_name = row["category_name"].ToString(),
                                              spending_name = row["spending_name"].ToString(),
                                              amount = Convert.ToDecimal(row["amount"].ToString()),
                                              transaction_date = row["transaction_on"].ToString(),
                                              currency= row["currency"].ToString(),
                                         transactiondate= row["transDate"].ToString()
                                          }).ToList();
                    }
                }
                transactionContext.monthly_transactions = transactions_data;
                return transactionContext;

            }
            catch (Exception )
            {
                throw ;
            }

        }
        public TransactionContext GettransactionsDashboard(Transactions transactions)
        {

            TransactionContext transactionContext = new TransactionContext();
            List<Transactions> summary = new List<Transactions>();
            List<Transactions> categorywise = new List<Transactions>();
            List<Transactions> recent = new List<Transactions>();
            List<Transactions> weekly = new List<Transactions>();
            List<Transactions> transactionList = new List<Transactions>();
            try
            {

                DataSet ds = new DataSet();
                ds = expenseTrackerDL.GettransactionsDashboard(transactions);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        summary = (from DataRow row in ds.Tables[0].Rows
                                   select new Transactions
                                   {

                                       spending_name = row["spending_name"].ToString(),
                                       amount = Convert.ToDecimal(row["amount"].ToString()),
                                       sort_oder = Convert.ToInt32(row["Sort_oder"].ToString())

                                   }).ToList();
                    }
                    if (ds.Tables[1].Rows.Count > 0)
                    {
                        categorywise = (from DataRow row in ds.Tables[1].Rows
                                        select new Transactions
                                        {

                                            category_name = row["category_name"].ToString(),
                                            amount = Convert.ToDecimal(row["amount"].ToString()),

                                        }).ToList();
                    }
                    if (ds.Tables[2].Rows.Count > 0)
                    {
                        recent = (from DataRow row in ds.Tables[2].Rows
                                        select new Transactions
                                        {

                                            transaction_id = Convert.ToInt32(row["transaction_id"].ToString()),
                                            category_name = row["category_name"].ToString(),
                                            spending_name = row["spending_name"].ToString(),
                                            amount = Convert.ToDecimal(row["amount"].ToString()),
                                            transaction_date = row["transaction_on"].ToString()

                                        }).ToList();
                    }
                    if (ds.Tables[3].Rows.Count > 0)
                    {
                        weekly = (from DataRow row in ds.Tables[3].Rows
                                  select new Transactions
                                  {

                                      spending_name = row["spending_name"].ToString(),
                                      amount = Convert.ToDecimal(row["amount"].ToString()),
                                      week_name = "Week" + ( row["week_nums"].ToString())

                                  }).ToList();
                    }
                    if (ds.Tables[4].Rows.Count > 0)
                    {
                        transactionContext.currency = ds.Tables[4].Rows[0]["currency"].ToString();
                    }
                    if (ds.Tables[5].Rows.Count > 0)
                    {
                        transactionList = (from DataRow row in ds.Tables[5].Rows
                                  select new Transactions
                                  {
                                      amount = Convert.ToDecimal(row["amount"].ToString()),
                                      transaction_date = row["transaction_on"].ToString()

                                  }).ToList();
                    }
                }
            
                transactionContext.transactions_summary = summary;
                transactionContext.transactions_categorywise = categorywise;
                transactionContext.transactions_recent = recent;
                transactionContext.transactions_weekly = weekly;
                transactionContext.transactions_list = transactionList;
                return transactionContext;

            }
            catch (Exception )
            {
                throw ;
            }

        }

        public DurationContext GetDuration(Duration duration)
        {

            DurationContext durationContext= new DurationContext();
            List<Duration> Duration_data = new List<Duration>();
            try
            {

                DataSet ds = new DataSet();
                ds = expenseTrackerDL.GetDuration(duration);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        Duration_data = (from DataRow row in ds.Tables[0].Rows
                                          select new Duration
                                          {

                                              duration_id = Convert.ToInt32(row["duration_id"].ToString()),
                                              duration_name = row["duration_name"].ToString()

                                          }).ToList();
                    }
                }
                durationContext.durations = Duration_data;
                return durationContext;

            }
            catch (Exception )
            {
                throw ;
            }

        }
    }
}