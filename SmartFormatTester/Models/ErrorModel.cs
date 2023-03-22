namespace SmartFormatTester.Models;

public class ErrorModel
{
    public string Field { get; set; } = null!;
    public string Message { get; set; } = null!;

    public ErrorModel(string field, string message)
    {
        Field = field;
        Message = message;
    }

    public ErrorModel()
    {
    }
}