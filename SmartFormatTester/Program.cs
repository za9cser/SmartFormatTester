using System.Text.RegularExpressions;
using SmartFormat;
using SmartFormat.Core.Settings;
using SmartFormat.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

Smart.Default.Settings.FormatErrorAction = ErrorAction.Ignore;
Smart.Default.Settings.ParseErrorAction = ErrorAction.Ignore;
// вырубаем форматтеры даты м времени от SmartFormat, чтобы работали стандартные .net форматтеры
Smart.Default.FormatterExtensions.RemoveAll(f => f is TimeFormatter);
Smart.Default.FormatterExtensions.Add(new IsMatchFormatter { RegexOptions = RegexOptions.CultureInvariant | RegexOptions.IgnoreCase });

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    "default",
    "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();