using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cookbook.Models
{

    public class RecipeGroup
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public List<RecipeHeader> Recipes { get; set; }
    }

    public class RecipeHeader
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string BackgroundImage { get; set; }
        public string TileImage { get; set; }
    }

}
