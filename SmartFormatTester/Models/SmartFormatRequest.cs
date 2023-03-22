namespace SmartFormatTester.Models;

public class SmartFormatRequest
{
    public string? Model { get; set; }
    public string?[]? Expressions { get; set; }
}

public class SmartFormatResponse
{
    public SmartFormatResult[]? SmartFormats { get; set; }

    public SmartFormatResponse(SmartFormatResult[]? smartFormats)
    {
        SmartFormats = smartFormats;
    }

    public SmartFormatResponse()
    {
    }
}

public class SmartFormatResult
{
    public string? Expression { get; set; }
    public string? Result { get; set; }

    public SmartFormatResult(string? expression, string? result)
    {
        Expression = expression;
        Result = result;
    }

    public SmartFormatResult()
    {
    }
}