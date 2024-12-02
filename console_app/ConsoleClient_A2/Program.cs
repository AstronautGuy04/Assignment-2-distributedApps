using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace GreetingsConsoleClient
{
    class Program
    {
        private static readonly HttpClient client = new HttpClient();
        private const string API_BASE_URL = "https://assignment-2-distributed-apps.vercel.app/api";

        // Updated model with correct property names
        public class GreetingRequest
        {
            [JsonProperty("timeOfDay")]
            public string timeOfDay { get; set; }

            [JsonProperty("language")]
            public string language { get; set; }

            [JsonProperty("tone")]
            public string tone { get; set; }
        }

        public class GreetingResponse
        {
            [JsonProperty("greetingMessage")]
            public string GreetingMessage { get; set; }
        }

        static async Task Main(string[] args)
        {
            try
            {
                Console.WriteLine("Welcome to the Greetings Console Client!\n");

                // Check if API is available
                try
                {
                    await client.GetAsync(API_BASE_URL + "/languages");
                    Console.WriteLine("Successfully connected to the API");
                }
                catch (Exception)
                {
                    Console.WriteLine("Error: Could not connect to the API. Please make sure the API server is running.");
                    return;
                }

                bool continueProgram = true;
                while (continueProgram)
                {
                    await GetGreeting();

                    Console.Write("\nWould you like to get another greeting? (y/n): ");
                    continueProgram = Console.ReadLine()?.ToLower() == "y";
                }

                Console.WriteLine("\nThank you for using the Greetings Console Client!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        }

        static async Task GetGreeting()
        {
            try
            {
                // Fetch available options
                var timesOfDay = await GetTimesOfDay();
                var languages = await GetLanguages();
                var tones = await GetTones();

                // Get user selections
                Console.WriteLine("\nAvailable times of day:");
                string selectedTime = GetUserSelection(timesOfDay);

                Console.WriteLine("\nAvailable languages:");
                string selectedLanguage = GetUserSelection(languages);

                Console.WriteLine("\nAvailable tones:");
                string selectedTone = GetUserSelection(tones);

                // Create and send request
                var request = new GreetingRequest
                {
                    timeOfDay = selectedTime,
                    language = selectedLanguage,
                    tone = selectedTone
                };

                var response = await SendGreetingRequest(request);

                // Display result
                Console.WriteLine("\n=================================");
                Console.WriteLine($"Your greeting: {response.GreetingMessage}");
                Console.WriteLine("=================================");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting greeting: {ex.Message}");
            }
        }

        static async Task<List<string>> GetTimesOfDay()
        {
            var response = await client.GetStringAsync($"{API_BASE_URL}/timesOfDay");
            var result = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(response);
            return result["timesOfDay"];
        }

        static async Task<List<string>> GetLanguages()
        {
            var response = await client.GetStringAsync($"{API_BASE_URL}/languages");
            var result = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(response);
            return result["languages"];
        }

        static async Task<List<string>> GetTones()
        {
            var response = await client.GetStringAsync($"{API_BASE_URL}/tones");
            var result = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(response);
            return result["tones"];
        }

        static async Task<GreetingResponse> SendGreetingRequest(GreetingRequest request)
        {
            var json = JsonConvert.SerializeObject(request);
            Console.WriteLine($"Sending request: {json}"); // Debug line to see what's being sent

            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync($"{API_BASE_URL}/greet", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"API Error: {responseContent}");
            }

            return JsonConvert.DeserializeObject<GreetingResponse>(responseContent);
        }

        static string GetUserSelection(List<string> options)
        {
            for (int i = 0; i < options.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {options[i]}");
            }

            int selection;
            do
            {
                Console.Write("Enter your selection (number): ");
            } while (!int.TryParse(Console.ReadLine(), out selection) ||
                    selection < 1 ||
                    selection > options.Count);

            return options[selection - 1];
        }
    }
}