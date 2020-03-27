using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using W9HL9H.ViewModels;
using Xamarin.Forms;

namespace W9HL9H
{
    // Learn more about making custom code visible in the Xamarin.Forms previewer
    // by visiting https://aka.ms/xamarinforms-previewer
    [DesignTimeVisible(false)]
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
            this.BindingContext = new MainViewModel(Navigation);
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            (this.BindingContext as MainViewModel).OnAppearing();
        }
    }
}
