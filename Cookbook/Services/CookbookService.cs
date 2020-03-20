using Cookbook.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Windows.Data.Json;
using Windows.Services.Maps;

namespace Cookbook.Services
{
    public class CookbookService
    {
        private readonly Uri serverUrl = new Uri("https://bmecookbook.azurewebsites.net");
        private async Task<T> GetAsync<T>(Uri uri)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(uri);
                var json = await response.Content.ReadAsStringAsync();
                T result = JsonConvert.DeserializeObject<T>(json);
                return result;
            }
        }

        private async Task<HttpResponseMessage> PostAsync(Uri uri, HttpContent content)
        {
            using (var client = new HttpClient())
            {
                var response = await client.PostAsync(uri, content);
                return response;
            }
        }

        public async Task<List<RecipeGroup>> GetRecipeGroupsAsync()
        {
            return await GetAsync<List<RecipeGroup>>(new Uri(serverUrl, "api/Recipes/Groups"));
        }

        public async Task<Recipe> GetRecipeAsync(int id)
        {
            return await GetAsync<Recipe>(new Uri(serverUrl, $"api/Recipes/{id}"));
        }

        public async Task<bool> PostCommentAsync(int id, String name, String newComment)
        {
            NewComment comment = new NewComment();
            comment.Email = name;
            comment.Text = newComment;
            string json = JsonConvert.SerializeObject(comment);
            var stringContent = new StringContent(json, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await PostAsync(new Uri(serverUrl, $"api/Recipes/{id}/Comments"), stringContent);
            return response.IsSuccessStatusCode;
        }
    }
}
