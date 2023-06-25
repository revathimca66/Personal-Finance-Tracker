using ExpenseTracker.BusinessLayer;
using ExpenseTracker.DataLayer;
using ExpenseTracker.Helper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("", policy =>
    {
        policy.WithOrigins("http://localhost:4200/");
    });
});
builder.Services.AddControllers();


builder.Services.AddScoped<ExpenseTrackerBL>();
builder.Services.AddScoped<ExpenseTrackerDL>();
builder.Services.AddScoped<utilityHelper>();
//builder.Services.AddControllers().AddNewtonsoftJson
//    (options => {
//        options.SerializerSettings.ContractResolver =
//    new Newtonsoft.Json.Serialization.DefaultContractResolver();
//    }); 
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseRouting();

app.UseCors(x => x.AllowAnyMethod().
AllowAnyHeader().SetIsOriginAllowed(orgin => true).
AllowCredentials());
app.UseAuthorization();
app.UseEndpoints(endPoints=> { endPoints.MapControllers(); });

app.Run();
