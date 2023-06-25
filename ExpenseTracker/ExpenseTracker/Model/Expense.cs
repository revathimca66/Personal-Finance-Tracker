namespace ExpenseTracker.Model
{
    public class UserInfo
    {
        public int? user_id { get; set; }
        public string? full_name { get; set; }
        public string? email_id { get; set; }
        public string? user_password { get; set; }
        public string? currency { get; set; }
        public int? app_access { get; set; }
    }
    
    public class Category
    {
        public int? user_id { get; set; }
        public int category_id { get; set; }
        public string? category_name { get; set; }
        public int spending_type { get; set; }      
        public int? category_status { get; set; }
        public string? updated_on { get; set; }
        public string? category_type { get; set; }
    }
    public class CategoryContext
    {
        public List<Category>? categories { get; set; }
    }
    public class Duration
    {
        public int? user_id { get; set; }
        public int duration_id { get; set; }
        public string? duration_name { get; set; }
    }
    public class DurationContext
    {
       public List<Duration>? durations { get; set; }
    }
    public class RecurringEvents
    {
        public int? event_id { get; set; }
        public int? user_id { get; set; }
        public int? category_type { get; set; }
        public int? spend_type { get; set; }
        public int? duration_type { get; set; }
        public decimal? amount { get; set; }
        public string? event_date { get; set; }
        public int? event_status { get; set; }
        public string? category_name { get; set; }
        public string? spending_name { get; set; }
        public string? duration_name { get; set; }
        public string? currency { get; set; }
       
    }
    public class RecurringeventContext
    {
        public List<RecurringEvents>? recurring_events { get; set; }
    }

    public class Transactions
    {
        public int? transaction_id { get; set; }
        public int user_id { get; set; }
        public int category_type { get; set; }
        public int spend_type { get; set; }
        public decimal? amount { get; set; }
        public string? transaction_date { get; set; }
        public int? transaction_status { get; set; }
        public string? category_name { get; set; }
        public string? spending_name { get; set; }
        public string? duration_name { get; set; }
        public int? recurring_event { get; set; }
        public int? duration_type { get; set; }
        public int? Month { get; set; }
        public int? Year { get; set; }
        public int? sort_oder { get; set; }
        public int? week_num { get; set; }
        public string? currency { get; set; }
        public string? week_name { get; set; }
        public string? transactiondate { get; set; }
    }
    public class TransactionContext
    {
        public List<Transactions>? monthly_transactions { get; set; }
        public List<Transactions>? transactions_summary { get; set; }
        public List<Transactions>? transactions_categorywise { get; set; }
        public List<Transactions>? transactions_recent { get; set; }
        public List<Transactions>? transactions_weekly { get; set; }
        public string? currency { get; set; }
        public List<Transactions>? transactions_list { get; set; }
    }
    public class Response
    {
        public string? status { get; set; }
    }
}
