using System.Data;
using System.Data.SqlClient;

namespace ExpenseTracker.Helper
{
    public class utilityHelper
    {
        public DataSet GetDatasetByCommand( string StordeprocedureName, SqlParameter[] param)
        {

            try
            {
                using (DataSet ds = new DataSet())
                {


                     string ConnectionString = @"data source=servername; database=DBName;  User ID = userId; Password = password;";
                    
                    using (SqlConnection connection = new SqlConnection(ConnectionString))
                    {
                        using (SqlCommand command = new SqlCommand())
                        {
                            command.Connection = connection;
                            command.Connection.Open();
                            command.CommandText = StordeprocedureName;
                            command.CommandType = CommandType.StoredProcedure;
                            command.Parameters.AddRange(param);
                            using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                            {
                                adapter.Fill(ds);
                            }
                            command.Connection.Close();
                        }
                    }
                    return ds;
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }     
        }
    }
}
