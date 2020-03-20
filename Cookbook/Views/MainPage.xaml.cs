using Cookbook.Models;
using System;
using Windows.UI.Xaml.Controls;

namespace Cookbook.Views
{
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            InitializeComponent();
        }

        private void RecipeGroups_ItemClick(object sender, ItemClickEventArgs e)
        {
            var recipeHeader = (RecipeHeader)e.ClickedItem;
            ViewModel.NavigateToDetails(recipeHeader.Id);
        }
    }
}
