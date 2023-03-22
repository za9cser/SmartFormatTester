using Newtonsoft.Json;

namespace SmartFormatTester.Extensions;

public static class Utils
{
    public static bool TryDeserialize(this string input, out object? @object)
    {
        @object = null;
        try
        {
            @object = JsonConvert.DeserializeObject(input);
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(
                $"Deserialization error. Input:\n{input}\n\nError: {JsonConvert.SerializeObject(e, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore })}");
        }

        return false;
    }
}