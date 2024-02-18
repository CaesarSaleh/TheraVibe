using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ElevenLabsConsole;

class Program2
{
    private const string ApiUrl = "https://api.elevenlabs.io/v1/text-to-speech/ysVYSfBJOHpqT1ulcOCT";
    private const string ApiKey = "6a6d453c9607b8809fbed9499af7b128";
    private const string OutputFilePath = "output.wav";
    private const int ChunkSize = 1024;

    public static async Task TextToSpeechAsync(String content)
    {
        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Add("xi-api-key", ApiKey);

            var data = new
            {
                text = content,
                model_id = "eleven_monolingual_v1",
                voice_settings = new
                {
                    stability = 0.5,
                    similarity_boost = 0.5
                }
            };

            var jsonContent = new StringContent(JsonSerializer.Serialize(data), Encoding.UTF8, "application/json");
            
            using (var response = await httpClient.PostAsync(ApiUrl, jsonContent))
            {
                response.EnsureSuccessStatusCode();

                using (var fileStream = new FileStream(OutputFilePath, FileMode.Create, FileAccess.Write))
                {
                    var contentStream = await response.Content.ReadAsStreamAsync();
                    var buffer = new byte[ChunkSize];
                    int bytesRead;

                    while ((bytesRead = await contentStream.ReadAsync(buffer, 0, buffer.Length)) > 0)
                    {
                        await fileStream.WriteAsync(buffer, 0, bytesRead);
                    }
                }
            }
        }

        Console.WriteLine("Text-to-speech conversion completed. Output saved to 'output.wav2'");
    }
}
