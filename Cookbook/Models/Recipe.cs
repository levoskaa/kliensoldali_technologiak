using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cookbook.Models
{

    public class Recipe
    {
        public string[] ExtraImages { get; set; }
        public string[] Ingredients { get; set; }
        public string Directions { get; set; }
        public string Video { get; set; }
        public Comment[] Comments { get; set; }
        public Storesnearby[] StoresNearby { get; set; }
        public int Id { get; set; }
        public string Title { get; set; }
        public string BackgroundImage { get; set; }
        public string TileImage { get; set; }
    }

    public class Comment
    {
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public string Text { get; set; }
    }

    public class Storesnearby
    {
        public string Name { get; set; }
        public string Url { get; set; }
        public float Longitude { get; set; }
        public float Latitude { get; set; }
    }

}
