using System.Collections.Generic;
using System;
using System.Linq;
using System.Threading.Tasks;
using Template10.Mvvm;
using Template10.Services.NavigationService;
using Windows.UI.Xaml.Navigation;
using System.Collections.ObjectModel;
using Cookbook.Models;
using Windows.ApplicationModel.Store.Preview.InstallControl;
using Cookbook.Services;
using Cookbook.Views;

namespace Cookbook.ViewModels
{
    public class MainPageViewModel : ViewModelBase
    {
        public ObservableCollection<RecipeGroup> RecipeGroups { get; set; } = new ObservableCollection<RecipeGroup>();

        public override async Task OnNavigatedToAsync(object parameter, NavigationMode mode, IDictionary<string, object> state)
        {
            var service = new CookbookService();
            var recipeGroups = await service.GetRecipeGroupsAsync();
            foreach (var item in recipeGroups)
            {
                RecipeGroups.Add(item);
            }
            await base.OnNavigatedToAsync(parameter, mode, state);
        }

        public void NavigateToDetails(int recipeId)
        {
            NavigationService.Navigate(typeof(DetailsPage), recipeId);
        }
    }
}

