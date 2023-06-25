using ExpenseTracker.BusinessLayer;
using ExpenseTracker.Model;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExpenseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseTrackerController : ControllerBase
    {
        public readonly ExpenseTrackerBL expenseTrackerBL;
        public ExpenseTrackerController(ExpenseTrackerBL expense)
        {
            expenseTrackerBL = expense;
        }
        [HttpPost]
        [Route("signup")]
        public IActionResult SignUp([FromBody] UserInfo user)
        {
            try
            {
                Response response=new Response();
                response.status=expenseTrackerBL.SignUp(user);
                return Ok(response);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("signin")]
        public IActionResult login([FromBody] UserInfo user)
        {
            try
            {
                UserInfo userInfo = new UserInfo();
                userInfo = expenseTrackerBL.SignIn(user);
                return Ok(userInfo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        [Route("updateuserinfo")]
        public IActionResult UpdateUser([FromBody] UserInfo user)
        {
            try
            {
                UserInfo userInfo = new UserInfo();
                userInfo = expenseTrackerBL.UpdateUser(user);
                return Ok(userInfo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        [Route("getuser")]
        public IActionResult GetUser([FromBody] UserInfo user)
        {
            try
            {
                UserInfo userInfo = new UserInfo();
                userInfo = expenseTrackerBL.GetUser(user);
                return Ok(userInfo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        [Route("addcategory")]
        public IActionResult AddCategory([FromBody] Category category)
        {
            try
            {
                Response response = new Response();
                response.status = expenseTrackerBL.AddCategory(category);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("deletecategory")]
        public IActionResult DeleteCategory([FromBody] Category category)
        {
            try
            {
                Response response = new Response();
                response.status = expenseTrackerBL.DeleteCategory(category);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("getcategory")]
        public IActionResult GetCategory([FromBody] Category category)
        {
            try
            {
                CategoryContext categoryContext = new CategoryContext();
                categoryContext = expenseTrackerBL.GetCategory(category);
                return Ok(categoryContext);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("addrecurringevents")]
        public IActionResult AddRecurringEvents([FromBody] RecurringEvents recurringEvents)
        {
            try
            {
                Response response = new Response();
                response.status = expenseTrackerBL.AddRecurringEvents(recurringEvents);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        [Route("deleterecurringevents")]
        public IActionResult DeleteRecurringEvents([FromBody] RecurringEvents recurringEvents)
        {
            try
            {
                Response response = new Response();
                response.status = expenseTrackerBL.DeleteRecurringEvents(recurringEvents);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("getrecurringevents")]
        public IActionResult GetRecurrinEvents([FromBody] RecurringEvents recurringEvents)
        {
            try
            {
                RecurringeventContext recurringeventContext = new RecurringeventContext();
                recurringeventContext = expenseTrackerBL.GetRecurringEvents(recurringEvents);
                return Ok(recurringeventContext);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        [Route("getupcomingrecurringevents")]
        public IActionResult GetupcomingRecurrinEvents([FromBody] RecurringEvents recurringEvents)
        {
            try
            {
                RecurringeventContext recurringeventContext = new RecurringeventContext();
                recurringeventContext = expenseTrackerBL.GetUpcomingRecurrinEvents(recurringEvents);
                return Ok(recurringeventContext);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        [Route("addtransaction")]
        public IActionResult AddTransaction([FromBody] Transactions transactions)
        {
            try
            {
                Response response = new Response();
                response.status = expenseTrackerBL.AddTransaction(transactions);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost]
        [Route("deleteTransaction")]
        public IActionResult DeleteTransaction([FromBody] Transactions transactions)
        {
            try
            {
                Response response = new Response();
                response.status = expenseTrackerBL.DeleteTransaction(transactions);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("getmonthlytransactions")]
        public IActionResult GettransactionsMonthly([FromBody] Transactions transactions)
        {
            try
            {
                TransactionContext transactionContext = new TransactionContext();
                transactionContext = expenseTrackerBL.GettransactionsMonthly(transactions);
                return Ok(transactionContext);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost]
        [Route("gettransactionsdashboard")]
        public IActionResult GettransactionsDashboard([FromBody] Transactions transactions)
        {
            try
            {
                TransactionContext transactionContext = new TransactionContext();
                transactionContext = expenseTrackerBL.GettransactionsDashboard(transactions);
                return Ok(transactionContext);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("getduration")]
        public IActionResult GetDuration([FromBody] Duration duration)
        {
            try
            {
                DurationContext durationContext = new DurationContext();
                durationContext = expenseTrackerBL.GetDuration(duration);
                return Ok(durationContext);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
