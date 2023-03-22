using System.Text.RegularExpressions;
using SmartFormat;
using SmartFormat.Core.Settings;
using SmartFormat.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews().AddNewtonsoftJson();

Smart.Default.Settings.FormatErrorAction = ErrorAction.Ignore;
Smart.Default.Settings.ParseErrorAction = ErrorAction.Ignore;
Smart.Default.FormatterExtensions.RemoveAll(f => f is TimeFormatter);
Smart.Default.FormatterExtensions.Add(new IsMatchFormatter { RegexOptions = RegexOptions.CultureInvariant | RegexOptions.IgnoreCase });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    "default",
    "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();