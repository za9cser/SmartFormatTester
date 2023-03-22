using Microsoft.AspNetCore.Mvc;

namespace SmartFormatTester.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SmartFormatController : Controller
{
    [HttpPost]
    public IActionResult Format(int arg1Name)
    {
        return Ok();
    }
}