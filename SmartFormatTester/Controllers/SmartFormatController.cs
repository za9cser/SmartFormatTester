using Microsoft.AspNetCore.Mvc;
using SmartFormat;
using SmartFormatTester.Extensions;
using SmartFormatTester.Models;

namespace SmartFormatTester.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SmartFormatController : Controller
{
    [HttpPost]
    public IActionResult Format(SmartFormatRequest? request)
    {
        if (string.IsNullOrWhiteSpace(request?.Model))
            return BadRequest(new ErrorModel(nameof(SmartFormatRequest.Model), "Model is not specified"));

        if (request.Expressions?.Length is null or 0)
            return BadRequest(new ErrorModel(nameof(SmartFormatRequest.Expressions), "Expressions are not specified"));

        if (!request.Model.TryDeserialize(out var model) || model == null)
            return BadRequest(new ErrorModel(nameof(SmartFormatRequest.Model), "Model is not valid json"));

        var results = new SmartFormatResult[request.Expressions.Length];
        for (int i = 0; i < results.Length; i++)
        {
            var expression = request.Expressions[i];
            var result = new SmartFormatResult(
                expression ?? "",
                !string.IsNullOrWhiteSpace(expression) ? Smart.Format(expression, model) : "");

            results[i] = result;
        }

        return Ok(new SmartFormatResponse(results));
    }
}