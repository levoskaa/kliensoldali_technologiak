using Cookbook.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<List<RecipeGroup>> GetRecipeGroupsAsync()
        {
            return await GetAsync<List<RecipeGroup>>(new Uri(serverUrl, "api/Recipes/Groups"));
        }

        public async Task<Recipe> GetRecipeAsync(int id)
        {
            return await GetAsync<Recipe>(new Uri(serverUrl, $"api/Recipes/{id}"));
        }

    }
}
