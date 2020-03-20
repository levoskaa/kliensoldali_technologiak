using Cookbook.Models;
using Cookbook.Services;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template10.Mvvm;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Navigation;

namespace Cookbook.ViewModels
{
    public class DetailsPageViewModel : ViewModelBase
    {
		private Recipe _recipe;

		public Recipe Recipe
		{
			get { return _recipe; }
			set { Set(ref _recipe, value); }
		}

		private string _newComment;
		public string NewComment
		{
			get { return _newComment; }
			set
			{
				Set(ref _newComment, value);
				SendCommentCommand.RaiseCanExecuteChanged();
			}
		}
		private string _name;
		public string Name
		{
			get { return _name; }
			set
			{
				Set(ref _name, value);
				SendCommentCommand.RaiseCanExecuteChanged();
			}
		}

		public DelegateCommand SendCommentCommand { get; }

		public DetailsPageViewModel()
		{
			SendCommentCommand = new DelegateCommand(SendComment, CanSendComment);
			Name = "";
			NewComment = "";			
		}
		
		private async void SendComment()
		{
			var service = new CookbookService();
			bool res = await service.PostCommentAsync(Recipe.Id, Name, NewComment);
			Recipe = await service.GetRecipeAsync(Recipe.Id);
			Name = String.Empty;
			NewComment = String.Empty;
		}

		private bool CanSendComment()
		{
			if (!Name.Equals("") && !NewComment.Equals(""))
				return true;
			return false;
		}

		public override async Task OnNavigatedToAsync(object parameter, NavigationMode mode, IDictionary<string, object> state)
		{
			var recipeId = (int)parameter;
			var service = new CookbookService();
			Recipe = await service.GetRecipeAsync(recipeId);
			await base.OnNavigatedToAsync(parameter, mode, state);
		}

	}
}
