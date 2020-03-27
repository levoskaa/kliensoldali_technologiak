using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using W9HL9H.ViewModels;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace W9HL9H
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class AddItemPage : ContentPage
    {
        public AddItemPage()
        {
            InitializeComponent();
            this.BindingContext = new AddItemViewModel(Navigation);
        }
    }
}