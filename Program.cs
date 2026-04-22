//using Microsoft.EntityFrameworkCore;
//using lipadcebu2.Data;

// Create a WebApplication builder - this sets up the ASP.NET Core application
var builder = WebApplication.CreateBuilder(args);

// Add services to the DI (Dependency Injection) container
// AddControllersWithViews() enables MVC pattern with Controllers and Razor Views
builder.Services.AddControllersWithViews();

// Optional: Database configuration
// Uncomment if you want to connect to SQL Server database
//builder.Services.AddDbContext<AppDbContext>(options =>
//    options.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=model;Trusted_Connection=True;TrustServerCertificate=True;")
//);

// Build the application - creates the WebApplication instance
var app = builder.Build();

// Configure the middleware pipeline
// Middleware processes HTTP requests and responses in order

// Enable serving static files (CSS, JS, images from wwwroot folder)
app.UseStaticFiles();

// Enable routing for the application
app.UseRouting();

// Environment-based configuration
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // In production: show custom error page instead of detailed error info
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    // HSTS enforces HTTPS connections
    app.UseHsts();
}

// Redirect HTTP requests to HTTPS for security
app.UseHttpsRedirection();

// Enable routing (used to match requests to controller actions)
app.UseRouting();

// Enable authorization - checks if user has permission to access resources
app.UseAuthorization();

app.MapStaticAssets();    

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Homepage}/{id?}")
    .WithStaticAssets();

app.Run();
