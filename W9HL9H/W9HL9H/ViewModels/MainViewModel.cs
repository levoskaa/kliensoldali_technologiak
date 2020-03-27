using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using W9HL9H.Models;
using W9HL9H.Services;
using Xamarin.Forms;

namespace W9HL9H.ViewModels
{
    public class MainViewModel : ViewModelBase
    {
        public List<TodoItem> Items => TodoService.Instance.GetAll();
        public ICommand AddItemCommand { get; }
        public MainViewModel(INavigation navigation) : base(navigation)
        {
            AddItemCommand = new Command(AddItemCommandExecute);
        }
        private async void AddItemCommandExecute()
        {
            await Navigation.PushAsync(new AddItemPage(), true);
        }
        public override void OnAppearing()
        {
            base.OnAppearing();
            OnPropertyChanged(nameof(Items));
        }
    }
}
