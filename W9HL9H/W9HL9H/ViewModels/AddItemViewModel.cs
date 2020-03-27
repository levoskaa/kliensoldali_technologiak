using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using W9HL9H.Services;
using Xamarin.Forms;

namespace W9HL9H.ViewModels
{
    public class AddItemViewModel : ViewModelBase
    {
        private string title;

        public string Title
        {
            get { return title; }
            set
            {
                title = value;
                OnPropertyChanged();
            }
        }

        private string description;
        public string Description
        {
            get { return description; }
            set
            {
                description = value;
                OnPropertyChanged();
            }
        }

        private bool isDone;
        public bool IsDone
        {
            get { return isDone; }
            set
            {
                isDone = value;
                OnPropertyChanged();
            }
        }
        public ICommand SaveItemCommand { get; }
        public AddItemViewModel(INavigation navigation) : base(navigation)
        {
            SaveItemCommand = new Command(AddItemCommandExecute);
        }
        private async void AddItemCommandExecute()
        {
            TodoService.Instance.AddItem(Title, Description, IsDone);
            await Navigation.PopAsync(true);
        }
    }
}
