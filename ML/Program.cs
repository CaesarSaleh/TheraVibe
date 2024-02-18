using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ElevenLabsConsole;
using AssemblyAiConsole;
public class Chat
{
    public string role { get; set; }
    public string message { get; set; }
}


public class Document
{
    public string id { get; set; }
    public string title { get; set; }
    public string snippet { get; set; }
    public string url { get; set; }
}

namespace YourNamespace
{
    class OutsideFile
    {
        static async Task Main(string[] args)
        {

//////////////////////////  Transcription  //////////////////////////
            string filePath = "D:\\Documents2\\CSharp\\record_out.wav";


            string message = await Program.transcribe(filePath);

//////////////////////////  Cohere  //////////////////////////

            List<Chat> chatHistory = new List<Chat>
            {
                new Chat { role = "user", message = "Hi, tell me about your services" },
                new Chat { role = "agent", message = "We provide innovative solutions for various industries" }
                // Add more chat history as needed
            };

            List<Document> documents = new List<Document>
            {
                new Document { id = "1", title = "Cohere API Documentation", snippet = "This is the documentation for the Cohere API", url = "" }
                // Add more documents as needed
            };

            // Make Cohere API call
            string response = await CohereChatApi.MakeChatApiCall(message, chatHistory, documents);

            // Print response
            Console.WriteLine("Cohere API Response:");
            Console.WriteLine(response);


            
//////////////////////////  Text to Speech  //////////////////////////
            await Program2.TextToSpeechAsync(response);
        }
    }
}
