namespace SmartFormatTester.Models;

public class SmartFormatRequest
{
    public string? Model { get; set; }
    public string[]? Expressions { get; set; }
}

public class SmartFormatResponse
{
    public string[]? Results { get; set; }

    public SmartFormatResponse(string[]? results)
    {
        Results = results;
    }

    public SmartFormatResponse()
    {
    }
}