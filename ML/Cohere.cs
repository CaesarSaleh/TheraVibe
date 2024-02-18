using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

public class CohereChatApi
{
    private const string ApiEndpoint = "https://api.cohere.ai/v1/chat";
    private const string ApiKey = "9TVaP25tCpwuh6fqfS2mqs3AM2YqcExItL96Xwxr";  // Replace with your actual API key

    public static async Task<string> MakeChatApiCall(string message, List<Chat> chatHistory, List<Document> documents)
    {
        using (var httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {ApiKey}");

            var requestBody = new
            {
                message,
                chat_history = chatHistory,
                documents = documents
            };

            var jsonBody = Newtonsoft.Json.JsonConvert.SerializeObject(requestBody);
            var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

            var response = await httpClient.PostAsync(ApiEndpoint, content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                // Deserialize the JSON string to an object
                var responseObject = Newtonsoft.Json.JsonConvert.DeserializeObject<CohereApiResponse>(responseContent);

                // Access the "text" property
                return responseObject?.text;
            }
            else
            {
                // Handle error response
                Console.WriteLine($"Error: {response.StatusCode}");
                return null;
            }
        }
    }
}

public class CohereApiResponse
{
    public string? response_id { get; set; }
    public string? text { get; set; }
    // Add other properties as needed
}
